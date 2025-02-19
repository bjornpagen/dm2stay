import type React from "react"

export interface Listing {
  data: {
    overview: Overview
    amenities: Amenities
    location: Location
    policies: Policies
    description: Description
    gallery: Gallery
    reviews: Review[]
  }
}

export interface Overview {
  title: string
  propertyType: string
  location: string
  capacity: number
  rating?: number
  reviewCount?: number
  isSuperhost?: boolean
  imageUrl?: string
  pricing?: {
    perNight: number
    perWeek: number
    perMonth: number
  }
}

export interface Amenities {
  title: string
  groups: {
    title: string
    amenities: {
      title: string
      available: boolean
    }[]
  }[]
}

export interface Location {
  title: string
  subtitle: string
  address: string
  locationDetails: {
    full: {
      id: string
      title: string
      content: string
    }[]
  }
  disclaimer?: string
}

export interface Policies {
  title: string
  cancellation: {
    policy: string
    milestones: {
      refund: string
    }[]
  }
  houseRules: {
    sections: {
      rules: {
        title: string
        icon?: React.ReactNode
      }[]
    }[]
  }
  safety: {
    items: {
      title: string
      icon?: React.ReactNode
    }[]
  }
}

export interface Description {
  title: string
  sections: {
    title?: string
    content: string
  }[]
}

export interface Gallery {
  title: string
  rooms: {
    images: {
      src: string
      accessibilityLabel?: string
    }[]
  }[]
}

export interface Review {
  id: number
  reviewer: {
    name: string
    photo: string
  }
  date: string
  rating: number
  comment: string
  highlight?: string
  response?: string
}

