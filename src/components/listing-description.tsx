import type { ListingData } from "@/server/types"

export function ListingDescription({
  description
}: { description: ListingData["description"] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{description.title}</h2>
      {description.sections.map((section) => (
        <div key={section.title} className="text-muted-foreground">
          {section.title && (
            <h3 className="font-semibold text-foreground mb-2">
              {section.title}
            </h3>
          )}
          <p
            className="leading-relaxed"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Content is sanitized
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        </div>
      ))}
    </div>
  )
}
