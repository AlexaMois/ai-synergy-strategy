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
  showAllLink?: boolean;
  embedded?: boolean;
}

const FAQTeaser = ({ items, title = "Частые вопросы", showAllLink = true, embedded = false }: FAQTeaserProps) => {
  return (
    <section className={`bt-faq ${embedded ? "bt-faq-embedded" : ""}`}>
      <div className="bt-faq-layout">
        <h2 className="bt-faq-heading">
          {title}
        </h2>
        <div className="bt-faq-body">
        <Accordion type="single" collapsible className="bt-faq-list">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bt-faq-item"
            >
              <AccordionTrigger className="bt-faq-trigger">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="bt-faq-answer whitespace-pre-line">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {showAllLink && <div className="bt-faq-more">
          <Link
            to="/faq"
            className="bt-faq-link"
          >
            Смотреть все вопросы →
          </Link>
        </div>}
        </div>
      </div>
    </section>
  );
};

export default FAQTeaser;