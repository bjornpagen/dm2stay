import type { Description } from "@/types/listing"

export function ListingDescription({
  description
}: { description: Description }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{description.title}</h2>
      {description.sections.map((section, index) => (
        <div key={index} className="text-muted-foreground">
          {section.title && (
            <h3 className="font-semibold text-foreground mb-2">
              {section.title}
            </h3>
          )}
          <p className="leading-relaxed">{section.content}</p>
        </div>
      ))}
    </div>
  )
}
