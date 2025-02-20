"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Info, X } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface PricingBreakdownProps {
  pricing: {
    perNight: number // in cents
    perWeek: number // in cents
    perMonth: number // in cents
    cleaningFee: number // in cents
    serviceFee: number // in cents
    taxRate: number
  }
  stayDetails: {
    nights: number
    basePrice: number // in cents
    cleaningFee: number // in cents
    serviceFee: number // in cents
    taxes: number // in cents
  }
}

export function PricingBreakdown({
  pricing,
  stayDetails
}: PricingBreakdownProps) {
  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string
    amount: number // in cents
  } | null>(null)
  const [isApplying, setIsApplying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatPrice = (cents: number) => {
    const dollars = cents / 100
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(dollars)
  }

  const subtotal = stayDetails.basePrice
  const total =
    subtotal +
    stayDetails.cleaningFee +
    stayDetails.serviceFee +
    stayDetails.taxes -
    (appliedDiscount?.amount || 0)

  const handleApplyDiscount = async () => {
    if (!discountCode) {
      return
    }

    setIsApplying(true)
    setError(null)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (discountCode.toLowerCase() === "summer2024") {
      setAppliedDiscount({ code: discountCode, amount: 5000 }) // $50.00 in cents
      setDiscountCode("")
    } else {
      setError("Invalid discount code")
    }

    setIsApplying(false)
  }

  const lineItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  }

  const getPriceDescription = () => {
    if (stayDetails.nights >= 30) {
      return `Monthly rate (${Math.floor(stayDetails.nights / 30)} months${stayDetails.nights % 30 ? ` + ${stayDetails.nights % 30} nights` : ""})`
    }
    if (stayDetails.nights >= 7) {
      return `Weekly rate (${Math.floor(stayDetails.nights / 7)} weeks${stayDetails.nights % 7 ? ` + ${stayDetails.nights % 7} nights` : ""})`
    }
    return `$${formatPrice(pricing.perNight)} × ${stayDetails.nights} nights`
  }

  return (
    <TooltipProvider>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Price Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            className="space-y-2"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {stayDetails.nights > 0 && (
              <motion.div
                className="flex justify-between items-center group"
                variants={lineItem}
              >
                <span className="flex items-center">
                  {getPriceDescription()}
                </span>
                <span className="font-medium transition-colors group-hover:text-primary">
                  ${formatPrice(stayDetails.basePrice)}
                </span>
              </motion.div>
            )}

            <motion.div
              className="flex justify-between items-center group"
              variants={lineItem}
            >
              <span className="flex items-center gap-2">
                Cleaning fee
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                      <Info className="h-3 w-3" />
                      <span className="sr-only">Cleaning fee info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>One-time fee for cleaning services</p>
                  </TooltipContent>
                </Tooltip>
              </span>
              <span className="font-medium transition-colors group-hover:text-primary">
                ${formatPrice(stayDetails.cleaningFee)}
              </span>
            </motion.div>

            <motion.div
              className="flex justify-between items-center group"
              variants={lineItem}
            >
              <span className="flex items-center gap-2">
                Service fee
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                      <Info className="h-3 w-3" />
                      <span className="sr-only">Service fee info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Platform service and support fee</p>
                  </TooltipContent>
                </Tooltip>
              </span>
              <span className="font-medium transition-colors group-hover:text-primary">
                ${formatPrice(stayDetails.serviceFee)}
              </span>
            </motion.div>

            <motion.div
              className="flex justify-between items-center group"
              variants={lineItem}
            >
              <span className="flex items-center gap-2">
                Taxes
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                      <Info className="h-3 w-3" />
                      <span className="sr-only">Tax info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Local taxes and fees ({(pricing.taxRate * 100).toFixed(0)}
                      %)
                    </p>
                  </TooltipContent>
                </Tooltip>
              </span>
              <span className="font-medium transition-colors group-hover:text-primary">
                ${formatPrice(stayDetails.taxes)}
              </span>
            </motion.div>

            <AnimatePresence>
              {appliedDiscount && (
                <motion.div
                  className="flex justify-between items-center text-green-600 group"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <span className="flex items-center gap-2">
                    Discount applied
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:text-red-500"
                      onClick={() => setAppliedDiscount(null)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove discount</span>
                    </Button>
                  </span>
                  <span className="font-medium">
                    -${formatPrice(appliedDiscount.amount)}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => {
                  setDiscountCode(e.target.value)
                  setError(null)
                }}
                className={cn(
                  "flex-1",
                  error ? "border-red-500 focus-visible:ring-red-500" : ""
                )}
              />
              <Button
                onClick={handleApplyDiscount}
                disabled={!discountCode || isApplying}
                className="min-w-[100px]"
              >
                {isApplying ? "Applying..." : "Apply"}
              </Button>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-sm text-red-500"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            className="flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-bold">${formatPrice(total)}</span>
          </motion.div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
