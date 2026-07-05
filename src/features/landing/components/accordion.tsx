import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * Lightweight, dependency-free accordion for the FAQ section. Built directly
 * rather than pulling in a Radix accordion primitive since this is the only
 * place in the app that needs one — avoids an unused-most-of-the-time
 * dependency for a single, simple use case.
 */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-border rounded-[var(--radius-lg)] border border-border", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-trigger-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-secondary/50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
              >
                {item.question}
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-base)]",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-4 text-sm text-muted-foreground"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
