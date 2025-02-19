"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"
import type { Customer } from "@/app/(dashboard)/customers/[id]/page"

export function CustomerHeader(params: {
  customer: Promise<Customer>
}) {
  const customer = React.use(params.customer)

  const dummyData = {
    avatar: "/avatar.jpg",
    location: "New York, USA",
    verificationStatus: {
      email: true,
      phone: true,
      government_id: false
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={dummyData.avatar} alt={customer.name ?? ""} />
            <AvatarFallback>
              {(customer.name?.[0] ?? "").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold truncate">{customer.name}</h2>
            {dummyData.location && (
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{dummyData.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Mail className="h-3 w-3 text-muted-foreground mr-2 flex-shrink-0" />
            <span className="truncate">{customer.email}</span>
          </div>
          {customer.phone && (
            <div className="flex items-center text-sm">
              <Phone className="h-3 w-3 text-muted-foreground mr-2 flex-shrink-0" />
              <span>{customer.phone}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {dummyData.verificationStatus.email && (
            <Badge variant="secondary" className="text-xs">
              Email Verified
            </Badge>
          )}
          {dummyData.verificationStatus.phone && (
            <Badge variant="secondary" className="text-xs">
              Phone Verified
            </Badge>
          )}
          {dummyData.verificationStatus.government_id && (
            <Badge variant="secondary" className="text-xs">
              ID Verified
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
