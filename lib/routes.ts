import { toRouteType } from "./graph/util/route-type"

export function buildStopRoute(
  type: number,
  {
    stop_id,
    stop_name,
  }: {
    stop_id: number
    stop_name: string
  }
) {
  const slug = `${stop_id}-${stop_name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")}`
  return `/stop/${toRouteType(type)}/${slug}`
}
