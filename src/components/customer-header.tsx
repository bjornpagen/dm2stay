"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Phone, Mail, Clock, CreditCard } from "lucide-react"
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
    },
    joinDate: customer.createdAt,
    totalSpent: 15000,
    lastActive: new Date()
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold">Customer Profile</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={dummyData.avatar} alt={customer.name ?? ""} />
            <AvatarFallback>
              {(customer.name?.[0] ?? "").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{customer.name}</h2>
            {dummyData.location && (
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{dummyData.location}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center p-4">
              <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
              <div>
                <p className="text-sm font-medium">Member Since</p>
                <p className="text-lg font-bold">
                  {dummyData.joinDate.toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-4">
              <CreditCard className="h-5 w-5 text-muted-foreground mr-3" />
              <div>
                <p className="text-sm font-medium">Total Spent</p>
                <p className="text-lg font-bold">
                  ${dummyData.totalSpent.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-4">
              <Phone className="h-5 w-5 text-muted-foreground mr-3" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-lg font-bold">
                  {customer.phone || "Not provided"}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-4">
              <Mail className="h-5 w-5 text-muted-foreground mr-3" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-lg font-bold truncate">{customer.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          <span>Last active {dummyData.lastActive.toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
