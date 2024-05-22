import { RouteType, usePTVClient } from "@/lib/ptv";
import { V3RouteWithStatus } from "@/lib/ptv/client";
import pLimit from "p-limit";

export async function GET(request: Request) {
  const client = usePTVClient();

  const routes = await client.v3.routesOneOrMoreRoutes({
    route_types: [RouteType.Train, RouteType.Tram, RouteType.Bus],
  });

  const limit = pLimit(5);

  const fetchStopsForRoute = async (route: V3RouteWithStatus) => {
    return client.v3.stopsStopsForRoute(
      route.route_id!,
      route.route_type as RouteType
    );
  };

  const results = await Promise.all(
    (routes.data as { routes: V3RouteWithStatus[] }).routes.map((route) =>
      limit(() => fetchStopsForRoute(route))
    )
  );

  const stops = results.reduce(
    (acc, result) => acc.concat(result.data.stops),
    [] as any[]
  );

  return new Response(JSON.stringify(stops), {
    headers: {
      "content-type": "application/json",
    },
  });
}
