import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQTeaserProps {
  items: FAQItem[];
  title?: string;
}

const FAQTeaser = ({ items, title = "Частые вопросы" }: FAQTeaserProps) => {
  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-center leading-[1.05]">
          {title}
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border rounded-xl px-4 bg-card"
            >
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-6">
          <Link
            to="/faq"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Смотреть все вопросы →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQTeaser;