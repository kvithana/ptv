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
  routePill?: React.ReactNode
}) {
  const departureTime =
    departure.estimated_departure_utc || departure.scheduled_departure_utc
  const timeUntilDeparture = departureTime
    ? formatMinsRemaining(parseISO(departureTime))
    : "N/A"
  const scheduledTime = departureTime
    ? format(parseISO(departureTime), "h:mm a")
    : "N/A"

  // Calculate if train is coming soon (within 5 minutes)
  const isComingSoon =
    timeUntilDeparture !== "N/A" &&
    !timeUntilDeparture.includes("hr") &&
    parseInt(timeUntilDeparture.split(" ")[0]) <= 5

  return (
    <div className="py-2">
      <div className="flex items-center justify-between">
        <div className="flex-grow next-service">
          {departure.run?.destination_name}
        </div>
        <div
          className={`station-time ${
            isComingSoon ? "text-tram" : "text-text-primary"
          }`}
        >
          {scheduledTime}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm min-remaining">
          {timeUntilDeparture}{" "}
          {departure.platform_number && (
            <span className="platform-indicator text-xs">
              Platform {departure.platform_number}
            </span>
          )}
        </div>
        {routePill}
      </div>
    </div>
  )
}
