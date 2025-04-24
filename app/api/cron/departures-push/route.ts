import { addMinutes } from 'date-fns';
import { NextResponse } from 'next/server';

const TRMNL_ENDPOINT = process.env.TRMNL_ENDPOINT || '';

// Add export for config to disable caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Define the stops to query
const STOPS = [
    { stopId: "1075", routeId: "7", routeType: "train" },
    { stopId: "3252", routeId: "947", routeType: "tram" }
];

export async function GET(request: Request) {
    try {
        // Create URL for the multi-stop API route
        const url = new URL('/api/departures/multi', process.env.NEXT_PUBLIC_DEPLOYMENT_BASEPATH || 'http://localhost:3000');

        // Convert stops to JSON and add as param
        url.searchParams.append('stops', JSON.stringify(STOPS));
        url.searchParams.append('reference_time', addMinutes(new Date(), 5).toISOString());
        url.searchParams.append('total_max_results', '10');

        console.log(`Fetching data from: ${url.toString()}`);

        // Fetch data from the internal API route
        const response = await fetch(url.toString(), {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',  // Prevent caching the fetch request
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const departures = await response.json();

        // Format data for TRMNL
        const formattedDepartures = departures.map((departure: any) => ({
            service: departure.service_name,
            destination: departure.destination_name || 'Unknown',
            route: departure.route_name || departure.route_number || 'Unknown',
            route_type: departure.route_type,
            platform: departure.platform || '',
            time: departure.departure_time,
            status: departure.status || 'Scheduled',
        }));

        // Format data for TRMNL using merge_variables structure
        const trmnlPayload = {
            merge_variables: {
                title: "Upcoming Departures",
                subtitle: `${formattedDepartures.length} upcoming departures`,
                departures: formattedDepartures
            }
        };

        // Push data to the TRMNL endpoint
        const trmnlResponse = await fetch(TRMNL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trmnlPayload),
            cache: 'no-store',  // Prevent caching the fetch request
        });

        if (!trmnlResponse.ok) {
            throw new Error(`Failed to push data to TRMNL: ${trmnlResponse.status} ${trmnlResponse.statusText}`);
        }

        // Return success response with cache control headers
        return NextResponse.json(
            {
                success: true,
                message: 'Successfully pushed multi-stop departure data to TRMNL',
                timestamp: new Date().toISOString(),
                departures: formattedDepartures
            },
            {
                headers: {
                    'Cache-Control': 'no-store, max-age=0, must-revalidate',
                    'Surrogate-Control': 'no-store',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }
        );
    } catch (error) {
        console.error('Cron job error:', error);

        // Return error response with cache control headers
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
                timestamp: new Date().toISOString(),
            },
            {
                status: 500,
                headers: {
                    'Cache-Control': 'no-store, max-age=0, must-revalidate',
                    'Surrogate-Control': 'no-store',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }
        );
    }
}
