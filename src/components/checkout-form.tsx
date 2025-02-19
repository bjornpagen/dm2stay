"use client"

import { Separator } from "@/components/ui/separator"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm, type FormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {
  CreditCard,
  Calendar,
  Lock,
  User,
  Mail,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Users
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DatePicker } from "@/components/ui/date-picker"
import React from "react"

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name is too short")
      .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
      .refine((val) => val.trim().includes(" "), "Please enter your full name"),
    email: z
      .string()
      .email("Invalid email address")
      .min(5, "Email is too short")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    cardNumber: z
      .string()
      .min(19, "Card number is required")
      .regex(/^(\d{4}\s){3}\d{4}$/, "Invalid card number format")
      .refine((val) => {
        // Basic Luhn algorithm check
        const digits = val.replace(/\s/g, "").split("").map(Number)
        const checksum = digits.reverse().reduce((sum, digit, i) => {
          let d = digit
          if (i % 2 === 1) {
            d *= 2
            if (d > 9) {
              d -= 9
            }
          }
          return sum + d
        }, 0)
        return checksum % 10 === 0
      }, "Invalid card number"),
    expiryDate: z
      .string()
      .regex(
        /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
        "Invalid expiry date format (MM/YY)"
      )
      .refine((val) => {
        const [month, year] = val.split("/")
        const expiry = new Date(
          2000 + Number.parseInt(year || "0"),
          Number.parseInt(month || "0") - 1
        )
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return expiry >= today
      }, "Card has expired"),
    cvv: z
      .string()
      .regex(/^\d{3,4}$/, "Invalid CVV")
      .refine((val) => val !== "000", "Invalid CVV"),
    checkIn: z.date({
      required_error: "Please select a check-in date"
    }),
    checkOut: z.date({
      required_error: "Please select a check-out date"
    }),
    guests: z
      .number()
      .min(1, "At least 1 guest required")
      .max(10, "Maximum 10 guests allowed"),
    specialRequests: z
      .string()
      .max(500, "Special requests must be less than 500 characters")
      .optional()
  })
  .refine(
    (data) => {
      return data.checkOut > data.checkIn
    },
    {
      message: "Check-out date must be after check-in date",
      path: ["checkOut"]
    }
  )

interface CheckoutFormProps {
  checkIn?: Date
  checkOut?: Date
  onDateChange: (type: "checkIn" | "checkOut", date?: Date) => void
  guests: number
  onGuestsChange: (guests: number) => void
  prospect: {
    name: string | null
    email: string | null
    phone: string | null
  }
}

export function CheckoutForm({
  checkIn,
  checkOut,
  onDateChange,
  guests,
  onGuestsChange,
  prospect
}: CheckoutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: prospect.name ?? "",
      email: prospect.email ?? "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      guests,
      specialRequests: "",
      checkIn,
      checkOut
    },
    mode: "onChange"
  })

  React.useEffect(() => {
    if (checkIn !== form.getValues("checkIn")) {
      form.setValue("checkIn", checkIn || new Date())
    }
    if (checkOut !== form.getValues("checkOut")) {
      form.setValue("checkOut", checkOut || new Date())
    }
  }, [checkIn, checkOut, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(values)
    setIsSubmitting(false)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = matches?.[0] || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    }
    return value
  }

  const getValidationState = (
    fieldName: keyof z.infer<typeof formSchema>,
    formState: FormState<z.infer<typeof formSchema>>
  ) => {
    if (!formState.dirtyFields[fieldName]) {
      return "default"
    }

    if (formState.errors[fieldName]) {
      return "error"
    }

    // Additional validation checks
    const value = form.getValues(fieldName)
    if (fieldName === "expiryDate" && typeof value === "string") {
      const [month, year] = value.split("/")
      const expiry = new Date(
        2000 + Number.parseInt(year || "0"),
        Number.parseInt(month || "0") - 1
      )
      if (expiry <= new Date()) {
        return "error"
      }
    }

    return "success"
  }

  const getValidationStyles = (state: string) => {
    if (state === "error") {
      return "border-red-500 focus-visible:ring-red-500"
    }
    if (state === "success") {
      return "border-green-500"
    }
    return ""
  }

  const inputFocusAnimation = {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  }

  const iconAnimation = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  }

  const errorMessageAnimation = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  }

  return (
    <Card>
      <CardHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <CardTitle>Booking Details</CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.1
              }}
            >
              {/* Stay Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Stay Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="checkIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-in Date</FormLabel>
                        <FormControl>
                          <DatePicker
                            date={field.value}
                            onDateChange={(date) => {
                              field.onChange(date)
                              onDateChange("checkIn", date)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="checkOut"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-out Date</FormLabel>
                        <FormControl>
                          <DatePicker
                            date={field.value}
                            onDateChange={(date) => {
                              field.onChange(date)
                              onDateChange("checkOut", date)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Guests</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type="number"
                            min={1}
                            max={10}
                            className="pl-9"
                            {...field}
                            onChange={(e) => {
                              const value = Number(e.target.value)
                              field.onChange(value)
                              onGuestsChange(value)
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requests</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special requests or requirements..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-6" />

              {/* Personal Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Details</h3>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, formState }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <motion.div
                          className="relative"
                          whileFocus={inputFocusAnimation}
                        >
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="John Doe"
                            className={cn(
                              "pl-9 pr-9 transition-all duration-200",
                              getValidationStyles(
                                getValidationState("name", formState)
                              )
                            )}
                          />
                          <AnimatePresence mode="wait">
                            {formState.dirtyFields.name && (
                              <motion.div
                                {...iconAnimation}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                              >
                                {getValidationState("name", formState) ===
                                "error" ? (
                                  <AlertCircle className="h-4 w-4 text-red-500" />
                                ) : (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </FormControl>
                      <AnimatePresence mode="wait">
                        {formState.errors.name && (
                          <motion.div {...errorMessageAnimation}>
                            <FormMessage />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, formState }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <motion.div
                          className="relative"
                          whileFocus={inputFocusAnimation}
                        >
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="john.doe@example.com"
                            className={cn(
                              "pl-9 pr-9 transition-all duration-200",
                              getValidationStyles(
                                getValidationState("email", formState)
                              )
                            )}
                          />
                          <AnimatePresence mode="wait">
                            {formState.dirtyFields.email && (
                              <motion.div
                                {...iconAnimation}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                              >
                                {getValidationState("email", formState) ===
                                "error" ? (
                                  <AlertCircle className="h-4 w-4 text-red-500" />
                                ) : (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </FormControl>
                      <AnimatePresence mode="wait">
                        {formState.errors.email && (
                          <motion.div {...errorMessageAnimation}>
                            <FormMessage />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-6" />

              {/* Payment Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment Details</h3>
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field: { onChange, ...field }, formState }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <motion.div
                          className="relative"
                          whileFocus={inputFocusAnimation}
                        >
                          <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            {...field}
                            className={cn(
                              "pl-9 pr-9 transition-all duration-200 font-mono",
                              getValidationStyles(
                                getValidationState("cardNumber", formState)
                              )
                            )}
                            maxLength={19}
                            onChange={(e) => {
                              const formatted = formatCardNumber(e.target.value)
                              onChange(formatted)
                            }}
                            placeholder="0000 0000 0000 0000"
                          />
                          <AnimatePresence mode="wait">
                            {formState.dirtyFields.cardNumber && (
                              <motion.div
                                {...iconAnimation}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                              >
                                {getValidationState("cardNumber", formState) ===
                                "error" ? (
                                  <AlertCircle className="h-4 w-4 text-red-500" />
                                ) : (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </FormControl>
                      <AnimatePresence mode="wait">
                        {formState.errors.cardNumber && (
                          <motion.div {...errorMessageAnimation}>
                            <FormMessage />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field: { onChange, ...field }, formState }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <motion.div
                            className="relative"
                            whileFocus={inputFocusAnimation}
                          >
                            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              {...field}
                              className={cn(
                                "pl-9 pr-9 transition-all duration-200 font-mono",
                                getValidationStyles(
                                  getValidationState("expiryDate", formState)
                                )
                              )}
                              placeholder="MM/YY"
                              maxLength={5}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, "")
                                if (value.length >= 2) {
                                  value = `${value.slice(0, 2)}/${value.slice(2)}`
                                }
                                onChange(value)
                              }}
                            />
                            <AnimatePresence mode="wait">
                              {formState.dirtyFields.expiryDate && (
                                <motion.div
                                  {...iconAnimation}
                                  className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                  {getValidationState(
                                    "expiryDate",
                                    formState
                                  ) === "error" ? (
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                  ) : (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </FormControl>
                        <AnimatePresence mode="wait">
                          {formState.errors.expiryDate && (
                            <motion.div {...errorMessageAnimation}>
                              <FormMessage />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field: { onChange, ...field }, formState }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <motion.div
                            className="relative"
                            whileFocus={inputFocusAnimation}
                          >
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              {...field}
                              type="password"
                              inputMode="numeric"
                              className={cn(
                                "pl-9 pr-9 transition-all duration-200 font-mono",
                                getValidationStyles(
                                  getValidationState("cvv", formState)
                                )
                              )}
                              maxLength={4}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "")
                                onChange(value)
                              }}
                              placeholder="000"
                            />
                            <AnimatePresence mode="wait">
                              {formState.dirtyFields.cvv && (
                                <motion.div
                                  {...iconAnimation}
                                  className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                  {getValidationState("cvv", formState) ===
                                  "error" ? (
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                  ) : (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </FormControl>
                        <AnimatePresence mode="wait">
                          {formState.errors.cvv && (
                            <motion.div {...errorMessageAnimation}>
                              <FormMessage />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                type="submit"
                className="w-full relative"
                disabled={isSubmitting || !form.formState.isValid}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </motion.div>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Complete Booking
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
