import { formatMinsRemaining } from "@/lib/time"
import { format, parseISO } from "date-fns"

export function RouteStopDeparture({
  departure,
  routePill,
}: {
  departure: {
    estimated_departure_utc?: string | null
    scheduled_departure_utc?: string | null
    run?: {
      destination_name?: string | null
    } | null
    platform_number?: string | null
  }
  routePill: React.ReactNode
}) {
  const departureTime =
    departure.estimated_departure_utc || departure.scheduled_departure_utc
  const timeUntilDeparture = departureTime
    ? formatMinsRemaining(parseISO(departureTime))
    : "N/A"
  const scheduledTime = departureTime
    ? format(parseISO(departureTime), "h:mm a")
    : "N/A"
  return (
    <div className="mt-4 border-b pb-4">
      <div className="flex items-center">
        <div className="flex-grow text-black">
          To {departure.run?.destination_name}
        </div>
        <div className="text-gray-500">{timeUntilDeparture}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-mid-grey">
          Scheduled{" "}
          <span className="font-bold text-black">{scheduledTime}</span>{" "}
          <span>
            {departure.platform_number
              ? `Platform ${departure.platform_number}`
              : ""}
          </span>
        </div>
        {routePill}
      </div>
    </div>
  )
}
