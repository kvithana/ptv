import { differenceInSeconds } from "date-fns"
import { pluralise } from "./pluralise"

export function formatMinsRemaining(time: Date): string {
  try {
    const now = new Date()

    const difference = differenceInSeconds(time, now)

    if (difference < 60) {
      return "Now"
    }

    if (difference > 99 * 60) {
      return pluralise(Math.round(difference / 1800) / 2, "hr")
    }

    return pluralise(Math.floor(difference / 60), "min")
  } catch (err) {
    return "N/A"
  }
}
