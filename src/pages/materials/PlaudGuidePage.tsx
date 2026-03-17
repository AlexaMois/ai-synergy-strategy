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

const ANCHOR_MAP: Record<number, string> = {
  1: "plaud-device",
  4: "plaud-interface",
  14: "plaud-service",
};

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

      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-50/60 via-white to-white pb-10 pt-16 md:pt-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3">
            Инструкция по PLAUD на русском языке
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mt-3 max-w-2xl mx-auto">
            Найди ответ на свой вопрос — просто напиши, что не понимаешь
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto mt-6 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Например: как начать запись, autoflow, тариф, оплата..."
                className="pl-12 bg-white border-2 border-sky-100 rounded-2xl px-5 py-3 shadow-sm focus-visible:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-100 text-base h-auto"
              />
            </div>
            <Button className="rounded-2xl px-6 py-3 bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors h-auto shrink-0">
              Найти
            </Button>
          </div>

          {/* Anchor navigation */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a href="#plaud-device" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-sky-50 transition-colors">
              📱 Устройство
            </a>
            <a href="#plaud-interface" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-sky-50 transition-colors">
              💻 Интерфейс
            </a>
            <a href="#plaud-service" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-sky-50 transition-colors">
              ⚙️ Сервис и безопасность
            </a>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="bg-slate-50/60 py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6 md:space-y-8">
            {filteredSections.map((section) => {
              const Icon = section.icon;
              const partNum = section.id;
              const anchorId = ANCHOR_MAP[section.id];

              return (
                <div key={section.id} id={anchorId}>
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

                  <article className="rounded-2xl border border-slate-100 bg-white/80 shadow-sm px-4 py-5 md:px-8 md:py-7 flex flex-col gap-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
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
            <div className="mt-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-border" />
                <span className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-semibold shrink-0">
                  18
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <article className="rounded-2xl border border-slate-100 bg-white/80 shadow-sm px-4 py-5 md:px-8 md:py-7 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center shrink-0">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                    Частые вопросы
                  </h2>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-2">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border-none">
                      <AccordionTrigger
                        hideIndicator={false}
                        className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 text-left text-sm md:text-base font-medium text-slate-900 hover:bg-slate-50 transition-colors hover:no-underline"
                      >
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-2 text-sm md:text-base text-slate-700 bg-slate-50/60 rounded-b-xl">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </article>
            </div>
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
