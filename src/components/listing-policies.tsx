import type { Policies } from "@/types/listing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ListingPolicies({ policies }: { policies: Policies }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{policies.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="cancellation">
            <AccordionTrigger>Cancellation Policy</AccordionTrigger>
            <AccordionContent>
              <p>{policies.cancellation.policy}</p>
              <ul className="list-disc list-inside mt-2">
                {policies.cancellation.milestones.map((milestone, index) => (
                  <li key={index}>{milestone.refund}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="houseRules">
            <AccordionTrigger>House Rules</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {policies.houseRules.sections.flatMap((section) =>
                  section.rules.map((rule, index) => (
                    <li key={index} className="flex items-center">
                      {rule.icon && <span className="mr-2">{rule.icon}</span>}
                      <span>{rule.title}</span>
                    </li>
                  )),
                )}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="safety">
            <AccordionTrigger>Safety & Property</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {policies.safety.items.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

