import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Search, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";
import { sections, faqItems } from "./plaud-guide-sections";

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как пользоваться PLAUD AI диктофоном",
  inLanguage: "ru",
  description:
    "Полная пошаговая инструкция по PLAUD на русском языке: запись, расшифровка, саммари, AutoFlow, тарифы и оплата из России.",
  step: sections.map((s) => ({
    "@type": "HowToStep",
    name: s.title,
    text: s.tags,
  })),
};

const PlaudGuidePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return sections;
    return sections.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.tags.includes(q)
    );
  }, [searchQuery]);

  return (
    <PageTransition>
      <Helmet>
        <title>Инструкция по PLAUD на русском языке | Александра Моисеева</title>
        <meta
          name="description"
          content="Полная пошаговая инструкция по PLAUD AI на русском: запись, расшифровка, саммари, AutoFlow, тарифы, оплата из России. 18 разделов с примерами."
        />
        <link rel="canonical" href="https://aleksamois.ru/materials/plaud-guide" />
        <meta property="og:title" content="Инструкция по PLAUD на русском языке" />
        <meta
          property="og:description"
          content="Полный гид по PLAUD AI: от записи до автоматической отправки на почту. 18 разделов."
        />
        <meta property="og:url" content="https://aleksamois.ru/materials/plaud-guide" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Инструкция по PLAUD на русском языке" />
        <meta
          name="twitter:description"
          content="Полный гид по PLAUD AI: от записи до автоматической отправки на почту."
        />
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <PageBreadcrumbs
        currentPage="Инструкция по PLAUD"
        parentPages={[
          { label: "Материалы", href: "/materials" },
          { label: "Ресурсы", href: "/materials/resources" },
        ]}
        showBackButton
        backButtonHref="/materials/resources"
        backButtonLabel="Назад к ресурсам"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Инструкция по PLAUD на русском языке
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Найди ответ на свой вопрос — просто напиши, что не понимаешь
            </p>
          </div>

          {/* Search */}
          <div className="flex gap-3 max-w-2xl mx-auto mb-16">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Например: как начать запись, autoflow, тариф, оплата..."
                className="pl-12 h-13 rounded-2xl shadow-md text-base"
              />
            </div>
            <Button className="h-13 rounded-2xl px-6 shrink-0">Найти</Button>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {filteredSections.map((section, idx) => {
              const Icon = section.icon;
              const partNum = section.id;

              return (
                <div key={section.id}>
                  {/* Divider with part number */}
                  {partNum > 0 && (
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-px flex-1 bg-border" />
                      <span className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-semibold shrink-0">
                        {partNum}
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                  )}

                  <article
                    data-tags={section.tags}
                    className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 hover:shadow-md transition-all duration-300 border-l-4 ${section.borderColor}`}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                        {section.title}
                      </h2>
                    </div>

                    {section.content}
                  </article>
                </div>
              );
            })}
          </div>

          {/* Part 18: FAQ */}
          {(!searchQuery.trim() ||
            "вопросы ответы faq можно ли работает ли язык точность zoom интернет".includes(
              searchQuery.toLowerCase().trim()
            )) && (
            <>
              <div className="flex items-center gap-4 my-8">
                <div className="h-px flex-1 bg-border" />
                <span className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-semibold shrink-0">
                  18
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 hover:shadow-md transition-all duration-300 border-l-4 border-sky-500">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <HelpCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                    Частые вопросы
                  </h2>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </article>
            </>
          )}

          {/* No results */}
          {filteredSections.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                По вашему запросу ничего не найдено
              </p>
              <a
                href="https://t.me/aleksamois"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                Не нашли ответ? Напишите нам в Telegram →
              </a>
            </div>
          )}
        </div>
      </section>

      <Contact />
      <Partners />
      <Footer />
    </PageTransition>
  );
};

export default PlaudGuidePage;
