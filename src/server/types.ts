export interface Listing {
  metadata: Metadata
  data: ListingData
}

export interface Metadata {
  timestamp: string
  url: string
  listingId: string
  duration: number
}

export interface ListingData {
  h1Title: string
  overview: Overview
  amenities: Amenities
  location: Location
  host: Host
  policies: Policies
  description: Description
  gallery: Gallery
  reviews: Review[]
}

export interface Overview {
  title: string
  propertyType: string
  location: string
  capacity: number
  rating: number | null
  reviewCount: number
  ratings: Ratings | null
  isSuperhost: boolean
  description: string | null
  imageUrl: string | null
}

export interface Ratings {
  accuracy: number
  checkin: number
  cleanliness: number
  communication: number
  location: number
  value: number
  overall: number
}

export interface Amenities {
  title: string
  count: number
  groups: AmenityGroup[]
}

export interface AmenityGroup {
  title: string
  amenities: Amenity[]
}

export interface Amenity {
  title: string
  subtitle: string | null
  icon: string | null
  available: boolean
}

export interface Location {
  title: string
  subtitle: string | null
  coordinates: Coordinates
  mapMarkerType: string
  mapMarkerRadiusInMeters: number | null
  locationDetails: LocationDetails
  verification: Verification | null
  disclaimer: string | null
  homeIcon: string | null
  address: string | null
  addressTitle: string | null
  locationDisclaimer: string | null
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface LocationDetails {
  preview: unknown
  full: LocationDetail[]
}

export interface LocationDetail {
  id: string
  type: string
  title: string
  content: string | null
}

export interface Verification {
  isVerified: boolean
  helpText: string
}

export interface Host {
  title: string
  host: HostDetails
  about: string | null
  highlights: HostHighlight[]
  cohosts: Cohost[]
  details: HostExtraDetails | null
  disclaimer: string | null
}

export interface HostDetails {
  name: string
  userId: string
  isSuperhost: boolean
  isVerified: boolean
  profilePicture: string
  stats: HostStats
}

export interface HostStats {
  reviews: number
  rating: number
  yearsHosting: number
  monthsHosting: number
}

export interface HostHighlight {
  icon: string
  title: string
}

export interface Cohost {
  name: string
  userId: string
  profilePicture: string
}

export interface HostExtraDetails {
  responseDetails: string[]
  superhostTitle: string
  superhostDescription: string
}

export interface Policies {
  title: string
  cancellation: CancellationPolicy
  houseRules: HouseRules
  safety: Safety
  disclaimer: string | null
}

export interface CancellationPolicy {
  title: string
  policy: string
  details: string
  milestones: CancellationMilestone[]
  disclaimers: string[]
}

export interface CancellationMilestone {
  type: string
  timeframe: Timeframe | null
  refund: string | null
  startAt: string | null
  endAt: string | null
}

export interface Timeframe {
  title: string
  dates: string[]
}

export interface HouseRules {
  title: string
  subtitle: string
  sections: HouseRuleSection[]
}

export interface HouseRuleSection {
  title: string
  rules: HouseRule[]
}

export interface HouseRule {
  title: string
  icon: string | null
  subtitle: string | null
  details: string | null
}

export interface Safety {
  title: string
  subtitle: string
  items: SafetyItem[]
}

export interface SafetyItem {
  title: string
  icon: string | null
}

export interface Description {
  title: string
  sections: DescriptionSection[]
}

export interface DescriptionSection {
  title: string | null
  content: string
}

export interface Gallery {
  title: string
  rooms: GalleryRoom[]
}

export interface GalleryRoom {
  title: string | null
  images: GalleryImage[]
}

export interface GalleryImage {
  caption: string | null
  accessibilityLabel: string | null
  src: string
  aspectRatio: number
  orientation: "LANDSCAPE" | "PORTRAIT"
}

export interface Review {
  id: string
  rating: number
  date: string
  comment: string
  reviewer: Reviewer
  highlight: string | null
  response: string | null
}

export interface Reviewer {
  name: string
  location: string | null
  id: string
  photo: string
}
