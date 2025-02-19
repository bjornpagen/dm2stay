"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"
import { toast } from "sonner"

interface PriceEditorProps {
  pricing: {
    perNight: number
    perWeek: number
    perMonth: number
  }
  onSave: (prices: {
    perNight: number
    perWeek: number
    perMonth: number
  }) => void
}

export function ListingPriceEditor({ pricing, onSave }: PriceEditorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [prices, setPrices] = useState({
    perNight: pricing.perNight.toString(),
    perWeek: pricing.perWeek.toString(),
    perMonth: pricing.perMonth.toString()
  })

  const handleSave = () => {
    // Validate all inputs are numeric and positive
    const numericPrices = {
      perNight: Number.parseFloat(prices.perNight),
      perWeek: Number.parseFloat(prices.perWeek),
      perMonth: Number.parseFloat(prices.perMonth)
    }

    if (
      Object.values(numericPrices).some((price) => isNaN(price) || price < 0)
    ) {
      toast.error("Please enter valid positive numbers for all prices")
      return
    }

    onSave(numericPrices)
    setIsOpen(false)
  }

  const handleChange =
    (field: keyof typeof prices) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      // Allow empty string or numbers
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setPrices((prev) => ({
          ...prev,
          [field]: value
        }))
      }
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute right-2 top-2">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit prices</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Pricing</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="perNight">Price per night ($)</Label>
            <Input
              id="perNight"
              type="text"
              inputMode="decimal"
              value={prices.perNight}
              onChange={handleChange("perNight")}
              placeholder="Enter price per night"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="perWeek">Price per week ($)</Label>
            <Input
              id="perWeek"
              type="text"
              inputMode="decimal"
              value={prices.perWeek}
              onChange={handleChange("perWeek")}
              placeholder="Enter price per week"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="perMonth">Price per month ($)</Label>
            <Input
              id="perMonth"
              type="text"
              inputMode="decimal"
              value={prices.perMonth}
              onChange={handleChange("perMonth")}
              placeholder="Enter price per month"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
