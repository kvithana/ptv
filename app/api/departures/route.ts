import { NextRequest } from "next/server";
import { RouteType, getPTVClient } from "@/lib/ptv";
import { formatInTimeZone } from "date-fns-tz";
import { parseISO } from "date-fns";

export interface Departure {
    service_name: string;
    platform?: string;
    scheduled_departure_time: string;
    estimated_departure_time?: string;
    departure_time: string;
    is_real_time: boolean;
    destination_name?: string;
    status?: string;
}

export interface RouteData {
    route_id?: string;
    route_number?: string;
    route_name?: string;
    route_type: RouteType;
    direction_name?: string;
    direction_id?: string;
    stop_id: string;
    stop_name?: string;
    has_disruptions: boolean;
    disruption_info?: string[];
    departures: Departure[];
}

// Route object interface for type assertion
interface RouteObject {
    route_name?: string;
    route_number?: string;
    route_type?: number;
}

// Format time for display in Melbourne timezone
function formatTimeForDisplay(isoTime: string): string {
    // Using date-fns-tz to ensure correct timezone (Melbourne/Australia)
    return formatInTimeZone(
        parseISO(isoTime),
        "Australia/Melbourne",
        "HH:mm"
    );
}

export async function GET(request: NextRequest) {
    // Extract parameters from URL
    const searchParams = request.nextUrl.searchParams;
    const stopId = searchParams.get("stop_id");
    const routeTypeParam = searchParams.get("route_type");
    const routeId = searchParams.get("route_id");
    const directionId = searchParams.get("direction_id");
    const maxResults = searchParams.get("max_results") || "5"; // Default to 5 departures

    // Validate required parameters
    if (!stopId || !routeTypeParam) {
        return new Response(
            JSON.stringify({
                error: "Missing required parameters: stop_id and route_type are required",
            }),
            {
                status: 400,
                headers: {
                    "content-type": "application/json",
                },
            }
        );
    }

    // Parse route type
    let routeType: RouteType;
    try {
        switch (routeTypeParam) {
            case "train":
                routeType = RouteType.Train;
                break;
            case "tram":
                routeType = RouteType.Tram;
                break;
            case "bus":
                routeType = RouteType.Bus;
                break;
            default:
                return new Response(
                    JSON.stringify({ error: "Invalid route_type parameter" }),
                    { status: 400 }
                );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Invalid route_type parameter",
            }),
            {
                status: 400,
                headers: {
                    "content-type": "application/json",
                },
            }
        );
    }

    try {
        const client = getPTVClient();
        let response;

        if (routeId) {
            // Get departures for specific route
            response = await client.v3.departuresGetForStopAndRoute(
                routeType as any, // Cast to any to avoid type mismatch
                parseInt(stopId),
                routeId,
                {
                    direction_id: directionId ? parseInt(directionId) : undefined,
                    max_results: parseInt(maxResults),
                    include_cancelled: false,
                    expand: ["All"], // Use "All" to expand all objects
                }
            );
        } else {
            // Get departures for all routes of the given type at this stop
            response = await client.v3.departuresGetForStop(
                routeType as any, // Cast to any to avoid type mismatch
                parseInt(stopId),
                {
                    direction_id: directionId ? parseInt(directionId) : undefined,
                    max_results: parseInt(maxResults),
                    include_cancelled: false,
                    expand: ["All"], // Use "All" to expand all objects
                }
            );
        }

        // Create a map of disruption IDs to disruption titles
        const disruptionMap = new Map();
        if (response.data.disruptions) {
            for (const [id, disruption] of Object.entries(response.data.disruptions)) {
                if (disruption.title) {
                    disruptionMap.set(id, disruption.title);
                }
            }
        }

        // Get stop information
        const stopInfo = response.data.stops?.[stopId];

        // Group departures by route and direction
        const routeDeparturesMap = new Map<string, {
            routeInfo: RouteObject | undefined,
            directionInfo: any,
            departures: Departure[],
            disruptions: Set<string>
        }>();

        // Simplify the departure data for e-ink display
        const departures = response.data.departures || [];
        departures.forEach((departure) => {
            const routeId = departure.route_id?.toString() || "";
            const runId = departure.run_id?.toString() || "";
            const directionId = departure.direction_id?.toString() || "";

            // Use type assertion for route object
            const route = response.data.routes?.[routeId] as RouteObject | undefined;
            const run = response.data.runs?.[runId];
            const direction = response.data.directions?.[directionId];

            // Create a unique key for each route+direction combination
            const routeDirectionKey = `${routeId}-${directionId}`;

            // Initialize the map entry if it doesn't exist
            if (!routeDeparturesMap.has(routeDirectionKey)) {
                routeDeparturesMap.set(routeDirectionKey, {
                    routeInfo: route,
                    directionInfo: direction,
                    departures: [],
                    disruptions: new Set<string>()
                });
            }

            // Collect disruption titles for this departure
            if (departure.disruption_ids && departure.disruption_ids.length > 0) {
                departure.disruption_ids.forEach((disruptionId) => {
                    const title = disruptionMap.get(disruptionId.toString());
                    if (title) {
                        routeDeparturesMap.get(routeDirectionKey)?.disruptions.add(title);
                    }
                });
            }

            let status = "Scheduled";
            if (departure.estimated_departure_utc) {
                const scheduled = new Date(departure.scheduled_departure_utc || "");
                const estimated = new Date(departure.estimated_departure_utc);
                const diffMinutes = Math.floor((estimated.getTime() - scheduled.getTime()) / 60000);

                if (diffMinutes > 1) {
                    status = `Delayed ${diffMinutes} min`;
                } else if (diffMinutes < -1) {
                    status = `Early ${Math.abs(diffMinutes)} min`;
                } else {
                    status = "On time";
                }
            }

            if (departure.flags?.includes("CXL")) {
                status = "Cancelled";
            }

            // Format times with Melbourne timezone
            const scheduledTime = departure.scheduled_departure_utc
                ? formatTimeForDisplay(departure.scheduled_departure_utc)
                : "Unknown";

            const estimatedTime = departure.estimated_departure_utc
                ? formatTimeForDisplay(departure.estimated_departure_utc)
                : undefined;

            // Create the simplified departure
            const simplifiedDeparture: Departure = {
                service_name: direction?.direction_name || "Unknown",
                platform: departure.platform_number,
                scheduled_departure_time: scheduledTime,
                estimated_departure_time: estimatedTime,
                departure_time: estimatedTime || scheduledTime,
                is_real_time: !!departure.estimated_departure_utc,
                destination_name: run?.destination_name,
                status
            };

            routeDeparturesMap.get(routeDirectionKey)?.departures.push(simplifiedDeparture);
        });

        // Convert map to array of route data
        const routesWithDepartures: RouteData[] = [];

        routeDeparturesMap.forEach((data, key) => {
            const { routeInfo, directionInfo, departures, disruptions } = data;

            // Sort departures by time
            departures.sort((a, b) => {
                // Use departure_time for sorting
                return a.departure_time.localeCompare(b.departure_time);
            });

            // Check if there are disruptions
            const hasDisruptions = disruptions.size > 0;

            routesWithDepartures.push({
                route_id: routeInfo?.route_number || key.split('-')[0],
                route_number: routeInfo?.route_number,
                route_name: routeInfo?.route_name,
                route_type: (routeInfo?.route_type as RouteType) || routeType,
                direction_name: directionInfo?.direction_name,
                direction_id: directionInfo?.direction_id,
                stop_id: stopId,
                stop_name: stopInfo?.stop_name,
                has_disruptions: hasDisruptions,
                disruption_info: hasDisruptions ? Array.from(disruptions) : undefined,
                departures
            });
        });

        // Sort routes by route number/name
        routesWithDepartures.sort((a, b) => {
            const routeNumA = a.route_number || '';
            const routeNumB = b.route_number || '';
            return routeNumA.localeCompare(routeNumB);
        });

        return new Response(JSON.stringify(routesWithDepartures), {
            headers: {
                "content-type": "application/json",
                "cache-control": "public, s-maxage=60, stale-while-revalidate=30",
            },
        });
    } catch (error) {
        console.error("Error fetching departures:", error);
        return new Response(
            JSON.stringify({
                error: "Failed to fetch departures",
                details: error instanceof Error ? error.message : String(error),
            }),
            {
                status: 500,
                headers: {
                    "content-type": "application/json",
                },
            }
        );
    }
} 