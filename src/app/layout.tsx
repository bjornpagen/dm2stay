import "@/styles/globals.css"

import type { Metadata } from "next"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export const metadata: Metadata = {
  title: "DM2Stay",
  description: "A streamlined way to manage your property portfolio",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
}

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <DashboardSidebar />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
