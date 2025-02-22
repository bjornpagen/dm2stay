"use client"
import { Card } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <Card className="p-6 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to DM2Stay. We value your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            what information we collect, how we use it, and the choices you have
            regarding your information. This policy also addresses certain
            rights and obligations under applicable state laws, including the
            Texas Data Privacy and Security Act (effective February 22, 2025).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Personal Information</h3>
              <p className="text-muted-foreground">
                When you use our app, we may ask you to provide personally
                identifiable information—such as your name, email address, and
                other contact information—when you register, contact us, or
                interact with our app.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Usage Data</h3>
              <p className="text-muted-foreground">
                Our systems automatically record data such as your device's IP
                address, browser type, pages visited, time and date of visits,
                and other usage data that helps us improve performance and
                enhance user experience.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">
                Cookies and Tracking Technologies
              </h3>
              <p className="text-muted-foreground">
                We may use cookies or similar tracking technologies to
                personalize your experience, analyze patterns of usage, and
                deliver relevant content.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-muted-foreground">
            We use the information we collect for various purposes:
          </p>
          <ul className="list-disc ml-6 mt-2 text-muted-foreground">
            <li>Provide, maintain, and improve our app</li>
            <li>
              Communicate updates, announcements, and other information related
              to the app
            </li>
            <li>
              Allow you to participate in interactive features and customer
              support
            </li>
            <li>Monitor and analyze usage and trends</li>
            <li>Enhance the security and integrity of our app</li>
            <li>Comply with legal obligations and enforce our policies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            4. Data Sharing and Disclosure
          </h2>
          <p className="text-muted-foreground">
            We do not share your personal information with third parties except
            in the following circumstances:
          </p>
          <ul className="list-disc ml-6 mt-2 text-muted-foreground">
            <li>
              <span className="font-medium">With Your Consent:</span> Your
              information may be shared when you provide explicit consent
            </li>
            <li>
              <span className="font-medium">For Legal Reasons:</span> We may
              disclose your information if required by law or in response to
              valid legal requests
            </li>
            <li>
              <span className="font-medium">Service Providers:</span> We work
              with trusted third-party vendors to facilitate our services
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            5. Your Rights Under the Texas Data Privacy and Security Act
          </h2>
          <p className="text-muted-foreground">
            As a Texas resident, you have the following rights:
          </p>
          <ul className="list-disc ml-6 mt-2 text-muted-foreground">
            <li>
              <span className="font-medium">Right to Know:</span> Request
              information about your personal data processing
            </li>
            <li>
              <span className="font-medium">Right to Correct:</span> Correct
              inaccuracies in your personal data
            </li>
            <li>
              <span className="font-medium">Right to Delete:</span> Request
              deletion of your personal data
            </li>
            <li>
              <span className="font-medium">Right to Opt Out:</span> Opt out of
              data processing for targeted advertising
            </li>
            <li>
              <span className="font-medium">
                Protection Against Retaliation:
              </span>{" "}
              Freedom from discrimination for exercising these rights
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            6. Data Security and Retention
          </h2>
          <p className="text-muted-foreground">
            We take reasonable measures to secure your personal data using
            industry-accepted practices. However, no transmission method over
            the Internet or electronic storage method is completely secure. We
            retain your personal information only as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
          <p className="text-muted-foreground">
            Our app is not intended for children under the age of 13. We do not
            knowingly collect personal information from children under 13. If
            you believe that we have inadvertently collected information from a
            child under 13, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            8. Changes to This Privacy Policy
          </h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy periodically. When significant
            changes are made, we will notify you by posting a notice on our app
            and updating the "Last updated" date. You are encouraged to review
            this Privacy Policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy or wish to
            exercise your rights, please contact us at{" "}
            <a
              href="mailto:privacy@dm2stay.com"
              className="text-primary hover:underline"
            >
              privacy@dm2stay.com
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
