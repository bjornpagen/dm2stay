"use client"

import * as React from "react"
import { notFound } from "next/navigation"
import { ListingAmenities } from "@/components/listing-amenities"
import { ListingLocation } from "@/components/listing-location"
import { ListingPolicies } from "@/components/listing-policies"
import { ListingDescription } from "@/components/listing-description"
import { ListingGallery } from "@/components/listing-gallery"
import { ListingReviews } from "@/components/listing-reviews"
import { ListingAnalytics } from "@/components/listing-analytics"
import { ListingHeader } from "@/components/listing-header"
import type { Listing } from "@/types/listing"

// Generate static params for known listing IDs
// export async function generateStaticParams() {
//   // In a real app, you would fetch these IDs from your database/API
//   return [
//     { id: "1" },
//     { id: "2" },
//     { id: "3" },
//   ]
// }

const mockListing: Listing = {
  data: {
    overview: {
      title: "Luxury Villa in South Tyrol",
      propertyType: "Luxury Villa",
      location: "Bolzano, Trentino-Alto Adige/South Tyrol, Italy",
      capacity: 4,
      rating: 4.82,
      reviewCount: 55,
      imageUrl:
        "https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTc4ODk3MzIwMTc5MTQ2NDM3/original/711b3443-e480-4e29-9085-86062c04073a.jpeg",
      pricing: {
        perNight: 250,
        perWeek: 1500,
        perMonth: 5000
      }
    },
    amenities: {
      title: "Amenities",
      groups: [
        {
          title: "Basic",
          amenities: [
            { title: "Wi-Fi", available: true },
            { title: "Kitchen", available: true },
            { title: "Pool", available: true },
            { title: "Air conditioning", available: true },
            { title: "Heating", available: true },
            { title: "Washer", available: true },
            { title: "Dryer", available: true },
            { title: "TV", available: true }
          ]
        },
        {
          title: "Outdoor",
          amenities: [
            { title: "Private pool", available: true },
            { title: "Garden", available: true },
            { title: "BBQ grill", available: true },
            { title: "Parking", available: true },
            { title: "Mountain view", available: true }
          ]
        },
        {
          title: "Safety",
          amenities: [
            { title: "Smoke alarm", available: true },
            { title: "Carbon monoxide alarm", available: true },
            { title: "Fire extinguisher", available: true },
            { title: "First aid kit", available: true }
          ]
        }
      ]
    },
    location: {
      title: "Location",
      subtitle: "Prime Location in South Tyrolean Dolomites",
      address: "South Tyrolean Dolomites",
      locationDetails: {
        full: [
          {
            id: "1",
            title: "Surroundings",
            content:
              "Immersed in beautiful scenery of apple orchards with the wonderful surroundings of the South Tyrolean Dolomites."
          },
          {
            id: "2",
            title: "Getting around",
            content:
              "The property is easily accessible by car and has private parking. The nearest airport is Bolzano Airport (BZO), 15 km away."
          },
          {
            id: "3",
            title: "Neighborhood",
            content:
              "The area is known for its stunning natural beauty, hiking trails, and world-class skiing. Local restaurants and shops are within 5 minutes by car."
          }
        ]
      },
      disclaimer: "Exact location provided after booking confirmation"
    },
    policies: {
      title: "Policies",
      cancellation: {
        policy: "Flexible cancellation policy",
        milestones: [
          { refund: "100% refund up until 7 days before check-in" },
          { refund: "50% refund between 7 days and 24 hours before check-in" },
          { refund: "No refund within 24 hours of check-in" }
        ]
      },
      houseRules: {
        sections: [
          {
            rules: [
              { title: "Check-in: 3:00 PM - 8:00 PM" },
              { title: "Checkout: 11:00 AM" },
              { title: "No smoking" },
              { title: "No pets" },
              { title: "No parties or events" },
              { title: "Maximum 4 guests" }
            ]
          }
        ]
      },
      safety: {
        items: [
          { title: "Security cameras on property" },
          { title: "Must climb stairs" },
          { title: "May encounter wildlife" },
          { title: "Pool without gate or lock" }
        ]
      }
    },
    description: {
      title: "About this place",
      sections: [
        {
          title: "The space",
          content:
            "Mirror Houses are two small houses immersed in a beautiful scenery of apple orchards just outside, in the wonderful surroundings of the South Tyrolean Dolomites. The Mirror Houses offer a unique opportunity to spend a wonderful holiday surrounded by contemporary architecture of the highest standards in close contact with one of the most evocative landscapes that nature can offer."
        },
        {
          title: "Architecture",
          content:
            "The project Mirror Houses was developed by architect Peter Pichler. The design is inspired by the surrounding landscape: the units are floating on a base above the ground evoking lightness, while the mirror glass on the west facade borders the garden and reflects the amazing surroundings."
        },
        {
          title: "Interior",
          content:
            "Each unit contains a kitchen, living room, bathroom, and bedroom, all designed with high-end fixtures and furnishings. The interior is minimal yet comfortable, featuring floor-to-ceiling windows that blur the boundaries between inside and outside."
        }
      ]
    },
    gallery: {
      title: "Photos",
      rooms: [
        {
          images: [
            {
              src: "https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/eaf77ed0-35a8-4ec9-b343-b42fadd410a0.jpeg",
              accessibilityLabel: "Mirror House exterior view"
            },
            {
              src: "https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/7bf163ab-7190-474e-bd2e-620053a0d83f.jpeg",
              accessibilityLabel: "Living room with mountain view"
            },
            {
              src: "https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/4bb91c06-f10e-41c0-939d-7c1acd48a2bd.jpeg",
              accessibilityLabel: "Modern kitchen"
            },
            {
              src: "https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/259cac77-3c70-4f5a-a873-bbf0c9586190.jpeg",
              accessibilityLabel: "Master bedroom"
            },
            {
              src: "https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/c3822bda-2cec-4bd3-a2d3-eb938463d115.jpeg",
              accessibilityLabel: "Bathroom"
            }
          ]
        }
      ]
    },
    reviews: [
      {
        id: 1,
        reviewer: {
          name: "Kaveh",
          photo:
            "https://a0.muscache.com/im/users/238828/profile_pic/1284862687/original.jpg"
        },
        date: "April 2023",
        rating: 5,
        comment:
          "Everything was great. The building itself was amazing and exactly as advertised. The views are breathtaking and the design is spectacular."
      },
      {
        id: 2,
        reviewer: {
          name: "Maria",
          photo:
            "https://a0.muscache.com/im/users/7919941/profile_pic/1376202256/original.jpg"
        },
        date: "March 2023",
        rating: 5,
        comment:
          "A truly unique experience. The mirror house is a perfect blend of modern architecture and natural beauty. The pool was fantastic and the mountain views were incredible."
      },
      {
        id: 3,
        reviewer: {
          name: "James",
          photo:
            "https://a0.muscache.com/im/pictures/user/b8469367-3779-4aa1-910a-88377fc2fcdc.jpg"
        },
        date: "February 2023",
        rating: 4,
        comment:
          "Stunning property with amazing attention to detail. The location is perfect for both summer and winter activities.",
        highlight: "The architecture is simply breathtaking"
      }
    ]
  }
}

async function GallerySection({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const listing = mockListing

  if (!listing) {
    notFound()
  }

  return (
    <section className="-mx-6 -mt-6">
      {listing.data.gallery && (
        <ListingGallery gallery={listing.data.gallery} />
      )}
    </section>
  )
}

async function MainContentSection({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const listing = mockListing

  if (!listing) {
    notFound()
  }

  return (
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
  )
}

async function SidebarSection({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const listing = mockListing

  if (!listing) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <ListingAnalytics listingId={id} />
      {listing.data.policies && (
        <ListingPolicies policies={listing.data.policies} />
      )}
    </div>
  )
}

export default function ListingPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <div className="w-full space-y-8">
      <React.Suspense>
        <GallerySection params={params} />
      </React.Suspense>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <React.Suspense>
          <MainContentSection params={params} />
        </React.Suspense>
        <React.Suspense>
          <SidebarSection params={params} />
        </React.Suspense>
      </div>
    </div>
  )
}
