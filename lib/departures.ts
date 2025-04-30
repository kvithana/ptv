import { formatInTimeZone } from "date-fns-tz";
import { parseISO } from "date-fns";
import { RouteType, getPTVClient } from "@/lib/ptv";
import { V3DeparturesResponse } from "@/lib/ptv/client";

export interface Departure {
    service_name: string;
    platform?: string;
    scheduled_departure_time: string;
    scheduled_departure_time_utc: string;
    estimated_departure_time?: string;
    estimated_departure_time_utc?: string;
    departure_time: string;
    departure_time_utc?: string;
    is_real_time: boolean;
    destination_name?: string;
    status?: string;
    route_id?: string;
    route_number?: string;
    route_name?: string;
    route_type?: RouteType;
    stop_id?: string;
    stop_name?: string;
    direction_name?: string;
    direction_id?: string;
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
export interface RouteObject {
    route_name?: string;
    route_number?: string;
    route_type?: number;
    route_id?: string;
}

// Request parameters interface
export interface DepartureRequestParams {
    stopId: string;
    routeType: RouteType;
    routeId?: string | null;
    directionId?: string | null;
    maxResults: number;
    referenceTime?: Date;
}

// Multi-stop request parameters
export interface MultiStopRequestParams {
    stops: {
        stopId: string;
        routeId?: string;
        directionId?: string;
    }[];
    routeType: RouteType;
    maxResults: number;
}

/**
 * Format time for display in Melbourne timezone
 * @param isoTime ISO time string
 * @returns Formatted time string (HH:mm)
 */
export function formatTimeForDisplay(isoTime: string): string {
    // Using date-fns-tz to ensure correct timezone (Melbourne/Australia)
    return formatInTimeZone(
        parseISO(isoTime),
        "Australia/Melbourne",
        "HH:mm"
    );
}

/**
 * Parse route type from string parameter
 * @param routeTypeParam Route type as string
 * @returns RouteType enum value
 * @throws Error if invalid route type
 */
export function parseRouteType(routeTypeParam: string): RouteType {
    switch (routeTypeParam) {
        case "train":
            return RouteType.Train;
        case "tram":
            return RouteType.Tram;
        case "bus":
            return RouteType.Bus;
        default:
            throw new Error("Invalid route_type parameter");
    }
}

/**
 * Fetch departures data from PTV API for a single stop
 * @param params Request parameters
 * @returns PTV API response
 */
export async function fetchDeparturesData(params: DepartureRequestParams): Promise<V3DeparturesResponse> {
    const client = getPTVClient();

    if (params.routeId) {
        // Get departures for specific route
        const response = await client.v3.departuresGetForStopAndRoute(
            params.routeType as any, // Cast to any to avoid type mismatch
            parseInt(params.stopId),
            params.routeId,
            {
                direction_id: params.directionId ? parseInt(params.directionId) : undefined,
                max_results: params.maxResults,
                include_cancelled: false,
                date_utc: params.referenceTime ? params.referenceTime.toISOString() : undefined,
                expand: ["All"], // Use "All" to expand all objects
            }
        );
        return response.data;
    } else {
        // Get departures for all routes of the given type at this stop
        const response = await client.v3.departuresGetForStop(
            params.routeType as any, // Cast to any to avoid type mismatch
            parseInt(params.stopId),
            {
                direction_id: params.directionId ? parseInt(params.directionId) : undefined,
                max_results: params.maxResults,
                include_cancelled: false,
                expand: ["All"], // Use "All" to expand all objects
                date_utc: params.referenceTime ? params.referenceTime.toISOString() : undefined,
            }
        );
        return response.data;
    }
}

/**
 * Create a map of disruption IDs to their titles
 * @param disruptions Disruptions data from API response
 * @returns Map of disruption IDs to titles
 */
export function createDisruptionMap(disruptions?: Record<string, any>): Map<string, string> {
    const disruptionMap = new Map<string, string>();
    if (disruptions) {
        for (const [id, disruption] of Object.entries(disruptions)) {
            if (disruption.title) {
                disruptionMap.set(id, disruption.title);
            }
        }
    }
    return disruptionMap;
}

/**
 * Calculate status of departure based on scheduled and estimated times
 * @param departure Departure data from API
 * @returns Status string
 */
export function calculateDepartureStatus(departure: any): string {
    if (departure.flags?.includes("CXL")) {
        return "Cancelled";
    }

    if (!departure.estimated_departure_utc) {
        return "Scheduled";
    }

    const scheduled = new Date(departure.scheduled_departure_utc || "");
    const estimated = new Date(departure.estimated_departure_utc);
    const diffMinutes = Math.floor((estimated.getTime() - scheduled.getTime()) / 60000);

    if (diffMinutes > 1) {
        return `Delayed ${diffMinutes} min`;
    } else if (diffMinutes < -1) {
        return `Early ${Math.abs(diffMinutes)} min`;
    } else {
        return "On time";
    }
}

/**
 * Process multiple departures into a flat list with complete information
 * @param responseData API response data
 * @param disruptionMap Map of disruption IDs to titles
 * @returns Array of processed departures
 */
export function processAllDepartures(
    responseData: V3DeparturesResponse,
    stopId: string
): Departure[] {
    const departures = responseData.departures || [];
    const processedDepartures: Departure[] = [];
    const disruptionMap = createDisruptionMap(responseData.disruptions);

    departures.forEach((departure) => {
        const routeId = departure.route_id?.toString() || "";
        const runId = departure.run_id?.toString() || "";
        const directionId = departure.direction_id?.toString() || "";

        // Use type assertion for route object
        const route = responseData.routes?.[routeId] as RouteObject | undefined;
        const run = responseData.runs?.[runId];
        const direction = responseData.directions?.[directionId];
        const stop = responseData.stops?.[stopId];

        const status = calculateDepartureStatus(departure);

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
            scheduled_departure_time_utc: departure.scheduled_departure_utc || "",
            estimated_departure_time: estimatedTime,
            estimated_departure_time_utc: departure.estimated_departure_utc || "",
            departure_time: estimatedTime || scheduledTime,
            departure_time_utc: departure.estimated_departure_utc || departure.scheduled_departure_utc,
            is_real_time: !!departure.estimated_departure_utc,
            destination_name: run?.destination_name,
            status,
            route_id: routeId,
            route_number: route?.route_number,
            route_name: route?.route_name,
            route_type: route?.route_type as RouteType,
            stop_id: stopId,
            stop_name: stop?.stop_name,
            direction_name: direction?.direction_name,
            direction_id: directionId
        };

        processedDepartures.push(simplifiedDeparture);
    });

    return processedDepartures;
}

/**
 * Process a single departure into the simplified format for route-grouped data
 * @param departure Raw departure data
 * @param responseData API response data
 * @param disruptionMap Map of disruption IDs to titles
 * @param routeDeparturesMap Map to store processed departures
 */
export function processDeparture(
    departure: any,
    responseData: V3DeparturesResponse,
    disruptionMap: Map<string, string>,
    routeDeparturesMap: Map<string, {
        routeInfo: RouteObject | undefined,
        directionInfo: any,
        departures: Departure[],
        disruptions: Set<string>
    }>
): void {
    const routeId = departure.route_id?.toString() || "";
    const runId = departure.run_id?.toString() || "";
    const directionId = departure.direction_id?.toString() || "";

    // Use type assertion for route object
    const route = responseData.routes?.[routeId] as RouteObject | undefined;
    const run = responseData.runs?.[runId];
    const direction = responseData.directions?.[directionId];

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
        departure.disruption_ids.forEach((disruptionId: any) => {
            const title = disruptionMap.get(disruptionId.toString());
            if (title) {
                routeDeparturesMap.get(routeDirectionKey)?.disruptions.add(title);
            }
        });
    }

    const status = calculateDepartureStatus(departure);

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
        departure_time_utc: departure.estimated_departure_utc || departure.scheduled_departure_utc,
        is_real_time: !!departure.estimated_departure_utc,
        scheduled_departure_time_utc: departure.scheduled_departure_utc || "",
        estimated_departure_time_utc: departure.estimated_departure_utc || "",
        destination_name: run?.destination_name,
        status
    };

    routeDeparturesMap.get(routeDirectionKey)?.departures.push(simplifiedDeparture);
}

/**
 * Convert route departures map to array of route data
 * @param routeDeparturesMap Map of route+direction to departures
 * @param stopId Stop ID
 * @param stopName Stop name
 * @param defaultRouteType Default route type to use if not found in route info
 * @returns Array of route data
 */
export function convertToRouteDataArray(
    routeDeparturesMap: Map<string, {
        routeInfo: RouteObject | undefined,
        directionInfo: any,
        departures: Departure[],
        disruptions: Set<string>
    }>,
    stopId: string,
    stopName: string | undefined,
    defaultRouteType: RouteType
): RouteData[] {
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
            route_type: (routeInfo?.route_type as RouteType) || defaultRouteType,
            direction_name: directionInfo?.direction_name,
            direction_id: directionInfo?.direction_id,
            stop_id: stopId,
            stop_name: stopName,
            has_disruptions: hasDisruptions,
            disruption_info: hasDisruptions ? Array.from(disruptions) : undefined,
            departures
        });
    });

    // Sort routes by route number/name
    return routesWithDepartures.sort((a, b) => {
        const routeNumA = a.route_number || '';
        const routeNumB = b.route_number || '';
        return routeNumA.localeCompare(routeNumB);
    });
} 