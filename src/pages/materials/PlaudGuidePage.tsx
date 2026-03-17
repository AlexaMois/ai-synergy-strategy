import { Helmet } from "react-helmet-async";
import { ArrowRight, ChevronRight, Shield, AlertTriangle, CreditCard, Zap } from "lucide-react";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  valueCards,
  benefitCards,
  modelComparison,
  gettingStartedSteps,
  interfaceBlocks,
  features,
  autoFlowSteps,
  plans,
  paymentSteps,
  securityCerts,
  securityTips,
  disableCloudSteps,
  faqItems,
  conclusionTips,
} from "./plaud-guide-sections";

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как использовать PLAUD AI — полный гид на русском",
  inLanguage: "ru",
  description:
    "Показываю, как за 5 минут превратить голос в структурированный текст, задачи и выводы. Выбор модели, настройка, интерфейс, AutoFlow, тарифы и оплата из России.",
  step: gettingStartedSteps.map((s) => ({
    "@type": "HowToStep",
    name: s.title,
    text: s.desc,
  })),
};

const PlaudGuidePage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Как использовать PLAUD AI — полный гид на русском | Александра Моисеева</title>
        <meta
          name="description"
          content="Полный гид по PLAUD AI на русском: выбор модели, настройка, интерфейс, AutoFlow, тарифы, оплата из России, безопасность и FAQ."
        />
        <link rel="canonical" href="https://aleksamois.ru/materials/plaud-guide" />
        <meta property="og:title" content="Как использовать PLAUD AI — полный гид на русском" />
        <meta
          property="og:description"
          content="Выбор модели, настройка, функции, AutoFlow, тарифы и оплата из России. Всё о PLAUD в одном месте."
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
            Полный гид: от выбора модели до AutoFlow. Показываю, как за 5 минут превратить голос в&nbsp;структурированный текст
          </p>
          <span className="inline-block mt-6 rounded-full bg-sky-50 border border-sky-100 px-5 py-2 text-sm font-medium text-sky-700">
            Подходит для бизнеса, встреч, обучения и ежедневной работы
          </span>
        </div>
      </section>

      {/* ─── 2. ЧТО ТАКОЕ PLAUD — value cards ─── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Что это даёт
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {valueCards.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <span className="text-3xl">{c.emoji}</span>
                <h3 className="text-base font-semibold text-slate-900">{c.title}</h3>
                <p className="text-sm text-slate-500">→ {c.result}</p>
              </div>
            ))}
          </div>
          {/* accent number */}
          <div className="mt-10 rounded-2xl bg-sky-50 border border-sky-100 p-8 md:p-10 text-center">
            <p className="text-5xl md:text-6xl font-bold text-sky-600 mb-2">5 минут</p>
            <p className="text-lg text-slate-600">вместо часа переслушивания</p>
          </div>
        </div>
      </section>

      {/* ─── 3. ЧТО ВЫ ПОЛУЧИТЕ ─── */}
      <section className="py-16 md:py-20 bg-slate-50/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Что вы получите
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefitCards.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block">{c.emoji}</span>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-sm text-slate-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. СРАВНЕНИЕ МОДЕЛЕЙ — table ─── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Какую модель выбрать
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-900">Модель</TableHead>
                  <TableHead>Форм-фактор</TableHead>
                  <TableHead>Запись</TableHead>
                  <TableHead>Память</TableHead>
                  <TableHead>Батарея</TableHead>
                  <TableHead>Лучше для</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modelComparison.map((m) => (
                  <TableRow key={m.name}>
                    <TableCell className="font-semibold text-slate-900">{m.name}</TableCell>
                    <TableCell>{m.formFactor}</TableCell>
                    <TableCell>{m.recording}</TableCell>
                    <TableCell>{m.memory}</TableCell>
                    <TableCell>{m.battery}</TableCell>
                    <TableCell className="text-slate-600">{m.best}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-6 rounded-xl bg-sky-50 border border-sky-100 px-5 py-4 text-sm text-sky-800">
            💡 <strong>Совет:</strong> Для большинства задач подойдёт PLAUD Note. Если нужна компактность на каждый день — NotePin.
          </div>
        </div>
      </section>

      {/* ─── 5. КАК НАЧАТЬ — numbered steps ─── */}
      <section className="py-16 md:py-20 bg-slate-50/60">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Как начать пользоваться
          </h2>
          <div className="space-y-4">
            {gettingStartedSteps.map((s) => (
              <div key={s.number} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white shadow-sm p-5 md:p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-lg font-bold text-white shrink-0">
                  {s.number}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. ИНТЕРФЕЙС — 3 columns + screenshot ─── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Разбор интерфейса
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {interfaceBlocks.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <span className="text-2xl mb-3 block">{b.emoji}</span>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{b.title}</h3>
                <ul className="space-y-2">
                  {b.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-slate-100 border border-slate-200 aspect-video flex items-center justify-center">
            <p className="text-slate-400 text-sm font-medium">Скриншот интерфейса PLAUD</p>
          </div>
        </div>
      </section>

      {/* ─── 7. ВАЖНЫЕ ФУНКЦИИ — feature grid ─── */}
      <section className="py-16 md:py-20 bg-slate-50/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Важные функции
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                <span className="text-2xl mb-3 block">{f.emoji}</span>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 mb-3">{f.desc}</p>
                <ul className="space-y-1.5">
                  {f.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. AUTOFLOW — dark accent ─── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="rounded-2xl bg-slate-900 text-white p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="h-7 w-7 text-sky-400" />
              <h2 className="text-3xl md:text-4xl font-bold">AutoFlow</h2>
            </div>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl">
              Автоматизация: задайте правило <strong className="text-white">WHEN</strong> (триггер) → <strong className="text-white">DO</strong> (действие), и PLAUD сделает всё сам после каждой записи.
            </p>

            {/* Example */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 mb-10">
              {["Запись завершена", "Генерация саммари", "Email с результатом"].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full bg-slate-800 border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </div>
                  {i < 2 && <ChevronRight className="hidden md:block h-5 w-5 text-slate-600 shrink-0" />}
                </div>
              ))}
            </div>

            {/* Setup steps */}
            <h3 className="text-xl font-semibold mb-4">Как настроить</h3>
            <div className="space-y-3">
              {autoFlowSteps.map((s) => (
                <div key={s.number} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/20 text-sm font-bold text-sky-400 shrink-0">
                    {s.number}
                  </span>
                  <div>
                    <p className="font-medium text-white">{s.title}</p>
                    <p className="text-sm text-slate-400">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-sm text-slate-300">
              ⚠️ AutoFlow работает только через мобильное приложение. Web-версия пока не поддерживает эту функцию.
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. ТАРИФЫ — plan cards ─── */}
      <section className="py-16 md:py-20 bg-slate-50/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Тарифы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div key={p.name} className={`rounded-2xl border shadow-sm p-6 flex flex-col ${p.name === "Pro" ? "bg-sky-50 border-sky-200" : "bg-white border-slate-100"}`}>
                <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                <p className="text-2xl font-bold text-sky-600 mt-2">{p.price}</p>
                <p className="text-sm text-slate-500 mt-1 mb-4">{p.minutes}</p>
                <ul className="space-y-2 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1 text-sky-500 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-400 mt-4 pt-4 border-t border-slate-100">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. ОПЛАТА ИЗ РОССИИ — warning accent ─── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-2xl bg-red-50 border border-red-200 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="h-6 w-6 text-red-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-red-900">Оплата из России</h2>
            </div>
            <div className="rounded-xl bg-red-100/60 border border-red-200 px-5 py-4 mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">
                  <strong>Важно:</strong> Российские банковские карты напрямую не проходят для оплаты подписки PLAUD.
                  Ниже — проверенный способ оплаты через сервис виртуальных карт.
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-red-900 mb-4">Способ 1: OplataZabugor.com</h3>
            <div className="space-y-3 mb-8">
              {paymentSteps.map((s) => (
                <div key={s.number} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700 shrink-0">
                    {s.number}
                  </span>
                  <div>
                    <p className="font-medium text-red-900">{s.title}</p>
                    <p className="text-sm text-red-700">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-red-900 mb-2">Способ 2: plaud.ru</h3>
            <p className="text-sm text-red-800">
              Официальный дистрибьютор в России. Можно приобрести устройство и подписку с оплатой российскими картами.
              Проверяйте актуальность на сайте.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 11. БЕЗОПАСНОСТЬ ─── */}
      <section className="py-16 md:py-20 bg-slate-50/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Shield className="h-7 w-7 text-slate-700" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Безопасность</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {securityCerts.map((c) => (
              <div key={c.name} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 text-center">
                <p className="font-bold text-slate-900 text-sm">{c.name}</p>
                <p className="text-xs text-slate-500 mt-1">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Практические гарантии</h3>
              <ul className="space-y-3">
                {securityTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-slate-700">
                    <Shield className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Как отключить облако</h3>
              <ol className="space-y-3">
                {disableCloudSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 12. FAQ — accordion ─── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">
            Частые вопросы
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-slate-200 bg-white shadow-sm px-5">
                <AccordionTrigger className="text-left text-base font-medium text-slate-900 hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-600">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── 13. ИТОГ + CTA ─── */}
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

          <div className="mb-10 text-left max-w-md mx-auto space-y-3">
            {conclusionTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-700">{tip}</p>
              </div>
            ))}
          </div>

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
