import { NextRequest } from "next/server";
import { RouteType } from "@/lib/ptv";
import {
    DepartureRequestParams,
    parseRouteType,
    fetchDeparturesData,
    createDisruptionMap,
    processDeparture,
    convertToRouteDataArray,
    Departure
} from "@/lib/departures";
import { pipe, forEach, take } from 'ramda';

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

// Add export for config to disable caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Parse and validate request parameters
 * @param request NextRequest object
 * @returns Validated parameters or error
 */
function parseRequestParams(request: NextRequest): DepartureRequestParams | Error {
    const searchParams = request.nextUrl.searchParams;
    const stopId = searchParams.get("stop_id");
    const routeTypeParam = searchParams.get("route_type");
    const routeId = searchParams.get("route_id");
    const directionId = searchParams.get("direction_id");
    const maxResults = searchParams.get("max_results") || "5"; // Default to 5 departures

    // Validate required parameters
    if (!stopId || !routeTypeParam) {
        return new Error("Missing required parameters: stop_id and route_type are required");
    }

    // Parse route type
    try {
        const routeType = parseRouteType(routeTypeParam);
        return {
            stopId,
            routeType,
            routeId,
            directionId,
            maxResults: parseInt(maxResults)
        };
    } catch (error) {
        return error instanceof Error ? error : new Error(String(error));
    }
}

export async function GET(request: NextRequest) {
    // Parse and validate parameters
    const paramsResult = parseRequestParams(request);

    if (paramsResult instanceof Error) {
        return new Response(
            JSON.stringify({ error: paramsResult.message }),
            {
                status: 400,
                headers: { "content-type": "application/json" },
            }
        );
    }

    try {
        // Fetch data from PTV API
        const response = await fetchDeparturesData(paramsResult);

        // Create disruption map
        const disruptionMap = createDisruptionMap(response.disruptions);

        // Get stop information
        const stopInfo = response.stops?.[paramsResult.stopId];

        // Group departures by route and direction
        const routeDeparturesMap = new Map<string, {
            routeInfo: any,
            directionInfo: any,
            departures: Departure[],
            disruptions: Set<string>
        }>();

        // Process each departure
        const departures = response.departures || [];

        // Use pipe with forEach to process departures
        pipe(
            forEach((departure: any) => {
                processDeparture(departure, response, disruptionMap, routeDeparturesMap);
            })
        )(departures);

        // Convert map to array of route data
        const routesWithDepartures = convertToRouteDataArray(
            routeDeparturesMap,
            paramsResult.stopId,
            stopInfo?.stop_name,
            Array.isArray(paramsResult.routeType) ? paramsResult.routeType[0] : paramsResult.routeType
        );

        // Limit the total number of departures per route to maxResults
        const limitedRoutes = routesWithDepartures.map(route => ({
            ...route,
            departures: take(paramsResult.maxResults, route.departures)
        }));

        return new Response(JSON.stringify(limitedRoutes), {
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