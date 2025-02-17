import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const AirbnbListingUrl = z
  .string()
  .url()
  .transform((url) => {
    const parsed = new URL(url)
    if (!parsed.hostname.endsWith("airbnb.com")) {
      throw new Error("Not an Airbnb URL")
    }

    const pathParts = parsed.pathname.split("/")
    if (pathParts[1] !== "rooms") {
      throw new Error("Not an Airbnb room URL")
    }

    const airbnbId = pathParts[2]
    if (!airbnbId) {
      throw new Error("No Airbnb ID found in URL")
    }

    return { airbnbId }
  })

export type AirbnbListingUrl = z.infer<typeof AirbnbListingUrl>
