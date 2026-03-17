import { Helmet } from "react-helmet-async";
import { ArrowRight, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";
import {
  valueCards,
  flowSteps,
  interfaceBlocks,
  scenarioSteps,
  useCases,
  mistakes,
} from "./plaud-guide-sections";

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как использовать PLAUD, чтобы не терять ни одной мысли",
  inLanguage: "ru",
  description:
    "Показываю, как за 5 минут превратить голос в структурированный текст, задачи и выводы.",
  step: scenarioSteps.map((s) => ({
    "@type": "HowToStep",
    name: s.title,
    text: s.description ?? s.bullets?.join(", "),
  })),
};

const PlaudGuidePage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Как использовать PLAUD AI — гид на русском | Александра Моисеева</title>
        <meta
          name="description"
          content="Показываю, как за 5 минут превратить голос в структурированный текст, задачи и выводы. Гид по PLAUD AI на русском языке."
        />
        <link rel="canonical" href="https://aleksamois.ru/materials/plaud-guide" />
        <meta property="og:title" content="Как использовать PLAUD AI — гид на русском" />
        <meta
          property="og:description"
          content="Превращай голос в результат: конспекты, задачи и выводы за 5 минут."
        />
        <meta property="og:url" content="https://aleksamois.ru/materials/plaud-guide" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <PageBreadcrumbs
        currentPage="Гид по PLAUD"
        parentPages={[
          { label: "Материалы", href: "/materials" },
          { label: "Ресурсы", href: "/materials/resources" },
        ]}
        showBackButton
        backButtonHref="/materials/resources"
        backButtonLabel="Назад к ресурсам"
      />

      {/* ─── 1. HERO ─── */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-white pb-16 pt-16 md:pt-24">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Как использовать PLAUD, чтобы не&nbsp;терять ни&nbsp;одной мысли
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mt-4 max-w-2xl mx-auto">
            Показываю, как за 5 минут превратить голос в структурированный текст, задачи и&nbsp;выводы
          </p>
          <span className="inline-block mt-6 rounded-full bg-sky-50 border border-sky-100 px-5 py-2 text-sm font-medium text-sky-700">
            Подходит для бизнеса, встреч, обучения и ежедневной работы
          </span>
        </div>
      </section>

      {/* ─── 2. VALUE CARDS ─── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Что это даёт
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {valueCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{card.emoji}</span>
                <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
                <p className="text-sm text-slate-500">→ {card.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. HOW IT WORKS (accent block) ─── */}
      <section className="py-16 md:py-20 bg-slate-50/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Как PLAUD превращает голос в&nbsp;результат
          </h2>

          {/* Flow chain */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0 mb-10">
            {flowSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-white border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 shadow-sm">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </div>
                {i < flowSteps.length - 1 && (
                  <ChevronRight className="hidden md:block h-5 w-5 text-slate-300 shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Accent callout */}
          <div className="rounded-2xl bg-slate-900 text-white p-8 md:p-10 text-center">
            <p className="text-xl md:text-2xl font-semibold leading-relaxed">
              Не просто расшифровка, а&nbsp;уже структурированная информация
            </p>
          </div>
        </div>
      </section>

      {/* ─── Accent number ─── */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="rounded-2xl bg-sky-50 border border-sky-100 p-8 md:p-10">
            <p className="text-5xl md:text-6xl font-bold text-sky-600 mb-2">5 минут</p>
            <p className="text-lg text-slate-600">вместо часа переслушивания</p>
          </div>
        </div>
      </section>

      {/* ─── 4. INTERFACE BREAKDOWN ─── */}
      <section className="py-16 md:py-20 bg-slate-50/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Интерфейс PLAUD: что здесь важно
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {interfaceBlocks.map((block) => (
              <div
                key={block.title}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
              >
                <span className="text-2xl mb-3 block">{block.emoji}</span>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{block.title}</h3>
                <ul className="space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Image placeholder */}
          <div className="rounded-xl bg-slate-100 border border-slate-200 aspect-video flex items-center justify-center">
            <p className="text-slate-400 text-sm font-medium">Скриншот интерфейса PLAUD</p>
          </div>
        </div>
      </section>

      {/* ─── 5. STEP-BY-STEP SCENARIO ─── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Как использовать PLAUD — простой сценарий
          </h2>

          <div className="space-y-4">
            {scenarioSteps.map((step) => (
              <div
                key={step.number}
                className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white shadow-sm p-5 md:p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-lg font-bold text-white shrink-0">
                  {step.number}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  {step.description && (
                    <p className="text-sm text-slate-500 mt-1">{step.description}</p>
                  )}
                  {step.bullets && (
                    <ul className="mt-2 space-y-1">
                      {step.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                          <ArrowRight className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. USE CASES ─── */}
      <section className="py-16 md:py-20 bg-slate-50/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Где это реально полезно
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
              >
                <span className="text-2xl mb-3 block">{uc.emoji}</span>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{uc.title}</h3>
                <ul className="space-y-2">
                  {uc.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. COMMON MISTAKES ─── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Частые ошибки
          </h2>

          <div className="space-y-4">
            {mistakes.map((m) => (
              <div
                key={m.error}
                className="rounded-xl bg-amber-50 border border-amber-100 px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-3"
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-base">❌</span>
                  <span className="font-semibold text-amber-900 text-sm">{m.error}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base shrink-0">→</span>
                  <span className="text-sm text-amber-800">{m.consequence}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. SUMMARY + CTA ─── */}
      <section className="py-16 md:py-24 bg-slate-50/60">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Что в итоге
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-slate-700 leading-relaxed mb-8">
            PLAUD — это не диктофон.
            <br />
            Это инструмент, который превращает речь в&nbsp;результат.
          </p>
          <a
            href="https://t.me/aleksamois"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-8 py-4 text-base font-semibold text-white hover:bg-sky-600 transition-colors shadow-md hover:shadow-lg"
          >
            Обсудить в Telegram
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      <Contact />
      <Partners />
      <Footer />
    </PageTransition>
  );
};

export default PlaudGuidePage;
