"use client"

import * as React from "react"

import type { Listing, Booking } from "@/app/(dashboard)/listings/[id]/page"
import { ListingGallery } from "@/components/listing-gallery"
import { ListingHeader } from "@/components/listing-header"
import { ListingDescription } from "@/components/listing-description"
import { ListingAmenities } from "@/components/listing-amenities"
import { ListingLocation } from "@/components/listing-location"
import { ListingReviews } from "@/components/listing-reviews"
import { ListingAnalytics } from "@/components/listing-analytics"
import { ListingPolicies } from "@/components/listing-policies"

export function ListingDetails(params: {
  listing: Promise<Listing>
  bookings: Promise<Booking[]>
}) {
  const listing = React.use(params.listing)
  //const bookings = React.use(params.bookings)

  if (!listing?.data) {
    return <div>Data loading from Airbnb, check back in a few minutes</div>
  }

  return (
    <React.Fragment>
      <section className="-mx-6 -mt-6">
        {listing.data.gallery && (
          <ListingGallery gallery={listing.data.gallery} />
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {listing.data.overview && (
            <ListingHeader overview={listing.data.overview} />
          )}
          {listing.data.description && (
            <ListingDescription description={listing.data.description} />
          )}
          {listing.data.amenities && (
            <ListingAmenities amenities={listing.data.amenities} />
          )}
          {listing.data.location && (
            <ListingLocation location={listing.data.location} />
          )}
          {listing.data.reviews && listing.data.reviews.length > 0 && (
            <ListingReviews reviews={listing.data.reviews} />
          )}
        </div>

        <div className="space-y-8">
          <ListingAnalytics listingId={listing.id} />
          {listing.data.policies && (
            <ListingPolicies policies={listing.data.policies} />
          )}
        </div>
      </div>
    </React.Fragment>
  )
}
