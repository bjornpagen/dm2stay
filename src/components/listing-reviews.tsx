import type { Review } from "@/types/listing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function ListingReviews({ reviews }: { reviews: Review[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center mb-2">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={review.reviewer.photo} alt={review.reviewer.name} />
                  <AvatarFallback>{review.reviewer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{review.reviewer.name}</p>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
                <div className="ml-auto flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                  <span>{review.rating}</span>
                </div>
              </div>
              <p>{review.comment}</p>
              {review.highlight && <p className="mt-2 font-medium">"Highlight: {review.highlight}"</p>}
              {review.response && (
                <div className="mt-2 pl-4 border-l-2 border-muted">
                  <p className="font-medium">Host response:</p>
                  <p>{review.response}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

