"use client"

import { useState } from "react"
import type { Gallery } from "@/types/listing"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ListingGallery({ gallery }: { gallery: Gallery }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const images = gallery.rooms.flatMap((room) => room.images)

  const imageClassName =
    "relative h-[400px] flex-shrink-0 overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:brightness-90"

  return (
    <>
      <div className="relative px-6 -mx-6">
        <div className="overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-4 w-max">
            {images.map((image, index) => (
              <div
                key={index}
                className={cn(imageClassName, index === 0 ? "w-[600px]" : "w-[300px]")}
                onClick={() => setSelectedImage(image.src)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.accessibilityLabel || ""}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative">
            {selectedImage && (
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Enlarged view"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />
            )}
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white border-none hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation()
                  const currentIndex = images.findIndex((img) => img.src === selectedImage)
                  const prevImage = images[currentIndex - 1]
                  if (prevImage) {
                    setSelectedImage(prevImage.src)
                  }
                }}
                disabled={images.findIndex((img) => img.src === selectedImage) === 0}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white border-none hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation()
                  const currentIndex = images.findIndex((img) => img.src === selectedImage)
                  const nextImage = images[currentIndex + 1]
                  if (nextImage) {
                    setSelectedImage(nextImage.src)
                  }
                }}
                disabled={images.findIndex((img) => img.src === selectedImage) === images.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next image</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white border-none hover:bg-black/70"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}

