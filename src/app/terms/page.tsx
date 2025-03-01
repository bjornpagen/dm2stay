"use client"
import { Card } from "@/components/ui/card"

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <Card className="p-6 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to DM2Stay. By accessing or using our service, you agree to
            be bound by these Terms of Service. Please read these terms
            carefully before using our platform. If you do not agree with any
            part of these terms, you may not use our service.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">In these Terms of Service:</p>
            <ul className="list-disc ml-6 text-muted-foreground">
              <li>
                <span className="font-medium">"Service"</span> refers to the
                DM2Stay platform, website, and related services
              </li>
              <li>
                <span className="font-medium">"User"</span> refers to any
                individual or entity using our Service
              </li>
              <li>
                <span className="font-medium">"Content"</span> refers to all
                information, text, graphics, photos, videos, data, or other
                materials uploaded or displayed on the Service
              </li>
              <li>
                <span className="font-medium">"Property"</span> refers to any
                real estate listing or rental property available through the
                Service
              </li>
            </ul>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. Account Registration
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              To use certain features of the Service, you must register for an
              account. You agree to:
            </p>
            <ul className="list-disc ml-6 text-muted-foreground">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly update any changes to your information</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
            </ul>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            4. User Responsibilities
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              When using our Service, you agree not to:
            </p>
            <ul className="list-disc ml-6 text-muted-foreground">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Submit false or misleading information</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
            </ul>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            5. Property Listings and Bookings
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Property listings on our platform are subject to the following
              terms:
            </p>
            <ul className="list-disc ml-6 text-muted-foreground">
              <li>All listings must be accurate and truthful</li>
              <li>Prices and availability are subject to change</li>
              <li>Bookings are subject to host approval and availability</li>
              <li>Users must comply with all booking terms and house rules</li>
              <li>Cancellation policies are set by individual hosts</li>
            </ul>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Payments and Fees</h2>
          <p className="text-muted-foreground">
            All payments and fees are subject to our payment terms. You agree to
            pay all applicable fees and taxes associated with your use of the
            Service. Refunds are subject to our refund policy and the specific
            terms of each booking.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            7. Intellectual Property
          </h2>
          <p className="text-muted-foreground">
            The Service and its original content, features, and functionality
            are owned by DM2Stay and are protected by international copyright,
            trademark, patent, trade secret, and other intellectual property
            laws.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            8. Limitation of Liability
          </h2>
          <p className="text-muted-foreground">
            To the maximum extent permitted by law, DM2Stay shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages, or any loss of profits or revenues, whether incurred
            directly or indirectly, or any loss of data, use, goodwill, or other
            intangible losses.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Dispute Resolution</h2>
          <p className="text-muted-foreground">
            Any disputes arising from or relating to these Terms shall be
            resolved through binding arbitration in accordance with the
            applicable laws of Texas. You agree to resolve any disputes on an
            individual basis and waive any right to pursue any claims on a class
            or consolidated basis.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            10. Modifications to Terms
          </h2>
          <p className="text-muted-foreground">
            We reserve the right to modify these Terms at any time. We will
            notify users of any material changes by posting the new Terms on
            this page and updating the "Last updated" date. Your continued use
            of the Service after such modifications constitutes your acceptance
            of the new Terms.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            11. Contact Information
          </h2>
          <p className="text-muted-foreground">
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:terms@dm2stay.com"
              className="text-primary hover:underline"
            >
              terms@dm2stay.com
            </a>
          </p>
        </section>
        <p className="text-sm text-muted-foreground text-right">
          Last updated: February 22, 2025
        </p>
      </Card>
    </div>
  )
}
