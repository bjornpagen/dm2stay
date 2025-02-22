import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, HomeIcon, Users } from "lucide-react"
import { InstagramLinkButton } from "@/components/instagram-link-button"

const menuItems = [
  { title: "Conversations", icon: MessageSquare, url: "/conversations" },
  { title: "Listings", icon: HomeIcon, url: "/listings" },
  { title: "Customers", icon: Users, url: "/customers" }
]

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Vacation Rental Dashboard
          </Link>
          <nav className="flex items-center gap-4">
            <ul className="flex items-center space-x-2">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5" />
                      <span className="hidden sm:inline">{item.title}</span>
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
            <div className="h-8 w-px bg-border" />
            <InstagramLinkButton />
          </nav>
        </div>
      </div>
    </header>
  )
}
