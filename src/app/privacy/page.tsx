"use client"

import { Card } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <Card className="p-6 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-muted-foreground">
            At DM2Stay, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our vacation rental booking service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Personal Information</h3>
              <p className="text-muted-foreground">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                <li>Name and contact information</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Social media handles (if provided)</li>
                <li>Payment information</li>
                <li>Booking preferences and history</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">Automatically Collected Information</h3>
              <p className="text-muted-foreground">When you use our service, we automatically collect certain information, including:</p>
              <ul className="list-disc ml-6 mt-2 text-muted-foreground">
                <li>Device and browser information</li>
                <li>IP address and location data</li>
                <li>Usage data and interactions with our service</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground">We use the collected information for various purposes, including:</p>
          <ul className="list-disc ml-6 mt-2 text-muted-foreground">
            <li>Processing your bookings and payments</li>
            <li>Communicating with you about your reservations</li>
            <li>Providing customer support</li>
            <li>Improving our services</li>
            <li>Sending relevant marketing communications (with your consent)</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-muted-foreground">You have the right to:</p>
          <ul className="list-disc ml-6 mt-2 text-muted-foreground">
            <li>Access your personal information</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Withdraw consent where applicable</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy or our practices, please contact us at{" "}
            <a href="mailto:privacy@dm2stay.com" className="text-primary hover:underline">
              privacy@dm2stay.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last revised" date and the updated version will be effective as soon as it is accessible.
          </p>
        </section>
      </Card>
    </div>
  )
} 