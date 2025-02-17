export interface Listing {
  metadata: Metadata
  data: ListingData
}

interface Metadata {
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

interface Overview {
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

interface Ratings {
  accuracy: number
  checkin: number
  cleanliness: number
  communication: number
  location: number
  value: number
  overall: number
}

interface Amenities {
  title: string
  count: number
  groups: AmenityGroup[]
}

interface AmenityGroup {
  title: string
  amenities: Amenity[]
}

interface Amenity {
  title: string
  subtitle: string | null
  icon: string | null
  available: boolean
}

interface Location {
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

interface Coordinates {
  lat: number
  lng: number
}

interface LocationDetails {
  preview: unknown
  full: LocationDetail[]
}

interface LocationDetail {
  id: string
  type: string
  title: string
  content: string | null
}

interface Verification {
  isVerified: boolean
  helpText: string | null
}

interface Host {
  title: string
  host: HostDetails
  about: string | null
  highlights: HostHighlight[]
  cohosts: Cohost[]
  details: HostExtraDetails | null
  disclaimer: string | null
}

interface HostDetails {
  name: string
  userId: string
  isSuperhost: boolean
  isVerified: boolean
  profilePicture: string
  stats: HostStats
}

interface HostStats {
  reviews: number
  rating: number
  yearsHosting: number
  monthsHosting: number
}

interface HostHighlight {
  icon: string
  title: string
}

interface Cohost {
  name: string
  userId: string
  profilePicture: string
}

interface HostExtraDetails {
  responseDetails: string[]
  superhostTitle: string
  superhostDescription: string
}

interface Policies {
  title: string
  cancellation: CancellationPolicy
  houseRules: HouseRules
  safety: Safety
  disclaimer: string | null
}

interface CancellationPolicy {
  title: string
  policy: string
  details: string
  milestones: CancellationMilestone[]
  disclaimers: string[]
}

interface CancellationMilestone {
  type: string
  timeframe: Timeframe | null
  refund: string | null
  startAt: string | null
  endAt: string | null
}

interface Timeframe {
  title: string
  dates: string[]
}

interface HouseRules {
  title: string
  subtitle: string
  sections: HouseRuleSection[]
}

interface HouseRuleSection {
  title: string
  rules: HouseRule[]
}

interface HouseRule {
  title: string
  icon: string | null
  subtitle: string | null
  details: string | null
}

interface Safety {
  title: string
  subtitle: string
  items: SafetyItem[]
}

interface SafetyItem {
  title: string
  icon: string | null
}

interface Description {
  title: string
  sections: DescriptionSection[]
}

interface DescriptionSection {
  title: string | null
  content: string
}

interface Gallery {
  title: string
  rooms: GalleryRoom[]
}

interface GalleryRoom {
  title: string | null
  images: GalleryImage[]
}

interface GalleryImage {
  caption: string | null
  accessibilityLabel: string | null
  src: string
  aspectRatio: number
  orientation: "LANDSCAPE" | "PORTRAIT"
}

interface Review {
  id: string
  rating: number
  date: string
  comment: string
  reviewer: Reviewer
  highlight: string | null
  response: string | null
}

interface Reviewer {
  name: string
  location: string | null
  id: string
  photo: string
}
