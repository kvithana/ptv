import { NextResponse } from 'next/server';

const TRMNL_ENDPOINT = process.env.TRMNL_ENDPOINT || '';

// Add export for config to disable caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
    try {
        // Create URL for the internal API route
        const url = new URL('/api/departures', process.env.NEXT_PUBLIC_DEPLOYMENT_BASEPATH || 'http://localhost:3000');
        url.searchParams.append('stop_id', '1075');
        url.searchParams.append('route_type', 'train');
        url.searchParams.append('route_id', '7');
        url.searchParams.append('direction_id', '1');

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

        const data = await response.json();

        // Format data for TRMNL using merge_variables structure
        const trmnlPayload = {
            merge_variables: {
                data
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
                message: 'Successfully pushed departure data to TRMNL',
                timestamp: new Date().toISOString(),
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