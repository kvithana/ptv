import { NextRequest } from "next/server";
import { RouteType } from "@/lib/ptv";
import {
    Departure,
    DepartureRequestParams,
    parseRouteType,
    fetchDeparturesData,
    processAllDepartures
} from "@/lib/departures";
import { pipe, flatten, sort, take } from 'ramda';

// Add export for config to disable caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Define interfaces for our API
interface StopInput {
    stopId: string;
    routeType: RouteType;
    routeId?: string;
    directionId?: string;
}

interface MultiStopParams {
    stops: {
        stopId: string;
        routeType: RouteType;
        routeId?: string;
        directionId?: string;
    }[];
    totalMaxResults: number;
}

/**
 * Parse and validate multi-stop request parameters
 * @param request NextRequest object
 * @returns Validated parameters or error
 */
function parseMultiStopRequestParams(request: NextRequest): MultiStopParams | Error {
    const searchParams = request.nextUrl.searchParams;
    const totalMaxResults = parseInt(searchParams.get("total_max_results") || "50"); // Default to 50 total departures

    // Parse the JSON stops parameter
    const stopsParam = searchParams.get("stops");

    if (!stopsParam) {
        return new Error("Missing required parameter: stops is required");
    }

    try {
        // Parse and validate stops
        const parsedStops = JSON.parse(stopsParam);

        if (!Array.isArray(parsedStops)) {
            throw new Error("stops must be a JSON array");
        }

        // Validate each stop and convert to StopConfig
        const stops: StopInput[] = parsedStops.map((stop) => {
            if (typeof stop !== 'object' || stop === null) {
                throw new Error("Each stop must be an object");
            }

            // Validate required fields
            if (!stop.stopId || typeof stop.stopId !== 'string') {
                throw new Error("Each stop must have a string stopId");
            }

            if (!stop.routeType || typeof stop.routeType !== 'string') {
                throw new Error("Each stop must have a string routeType");
            }

            // Parse the route type
            const routeType = parseRouteType(stop.routeType);

            // Create a properly typed stop object
            return {
                stopId: stop.stopId,
                routeType,
                routeId: stop.routeId,
                directionId: stop.directionId
            };
        });

        if (isNaN(totalMaxResults) || totalMaxResults < 1) {
            throw new Error("total_max_results must be a positive number");
        }

        return {
            stops,
            totalMaxResults
        };
    } catch (error) {
        return error instanceof Error
            ? error
            : new Error("Invalid stops parameter format");
    }
}

/**
 * Fetch departures for a single stop
 * @param stopConfig Stop configuration
 * @param maxResults Maximum results per stop
 * @returns Array of departures
 */
async function fetchDeparturesForStop(
    stopConfig: {
        stopId: string;
        routeType: RouteType;
        routeId?: string;
        directionId?: string;
    },
    maxResults: number
): Promise<Departure[]> {
    const params: DepartureRequestParams = {
        stopId: stopConfig.stopId,
        routeType: stopConfig.routeType,
        routeId: stopConfig.routeId || null,
        directionId: stopConfig.directionId || null,
        maxResults
    };

    try {
        const response = await fetchDeparturesData(params);
        return processAllDepartures(response, params.stopId);
    } catch (error) {
        console.error(`Error fetching departures for stop ${stopConfig.stopId}:`, error);
        return [];
    }
}

export async function GET(request: NextRequest) {
    // Parse and validate parameters
    const paramsResult = parseMultiStopRequestParams(request);

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
        // Fetch departures for each stop in parallel
        const perStopFetchLimit = 10
        const allDeparturesPromises = paramsResult.stops.map(stopConfig =>
            fetchDeparturesForStop(stopConfig, perStopFetchLimit)
        );

        // Wait for all requests to complete
        const allDeparturesArrays = await Promise.all(allDeparturesPromises);

        // Process all departures using Ramda utilities
        const processedDepartures = pipe(
            // Flatten the array of arrays
            flatten,

            // Sort all departures by departure time
            sort((a: Departure, b: Departure) => {
                // Compare departure times - null values sort to the end
                if (!a.departure_time_utc && !b.departure_time_utc) return 0;
                if (!a.departure_time_utc) return 1;
                if (!b.departure_time_utc) return -1;
                return new Date(a.departure_time_utc).getTime() - new Date(b.departure_time_utc).getTime();
            }),

            // Limit to the specified total maximum results
            take(paramsResult.totalMaxResults)
        )(allDeparturesArrays) as Departure[];

        return new Response(JSON.stringify(processedDepartures), {
            headers: {
                "content-type": "application/json",
                "cache-control": "public, s-maxage=60, stale-while-revalidate=30",
            },
        });
    } catch (error) {
        console.error("Error fetching multi-stop departures:", error);
        return new Response(
            JSON.stringify({
                error: "Failed to fetch multi-stop departures",
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