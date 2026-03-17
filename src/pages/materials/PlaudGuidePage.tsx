import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Search, Mic, ToggleLeft, Bluetooth, FileText, ListChecks, UserRound, Download, FolderOpen, Mail, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import PageTransition from "@/components/PageTransition";

interface GuideSection {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tags: string[];
  text: string;
  steps?: string[];
  image: string;
  imageAlt: string;
}

const sections: GuideSection[] = [
  {
    id: 1,
    icon: Mic,
    title: "Как начать и остановить запись",
    tags: ["запись", "кнопка", "старт", "стоп", "режим"],
    text: "Чтобы начать запись, нажмите и удерживайте кнопку на устройстве PLAUD в течение 1–2 секунд. Индикатор загорится, подтверждая начало записи. Для остановки — нажмите кнопку ещё раз.",
    steps: [
      "Убедитесь, что устройство заряжено и включено",
      "Нажмите и удерживайте основную кнопку 1–2 секунды",
      "Дождитесь индикации начала записи",
      "Для остановки нажмите кнопку повторно",
    ],
    image: "/images/plaud/section-1.jpg",
    imageAlt: "Кнопка записи на устройстве PLAUD AI",
  },
  {
    id: 2,
    icon: ToggleLeft,
    title: "Режимы записи: встреча vs звонок",
    tags: ["переключатель", "режим", "встреча", "звонок", "ползунок"],
    text: "PLAUD поддерживает два режима записи. Режим «Встреча» оптимизирован для записи нескольких голосов в помещении. Режим «Звонок» — для записи телефонных разговоров через прикрепление к смартфону.",
    steps: [
      "Переключите ползунок на корпусе устройства",
      "Режим «Встреча» — положите PLAUD рядом с участниками",
      "Режим «Звонок» — прикрепите PLAUD к задней панели телефона",
    ],
    image: "/images/plaud/section-2.jpg",
    imageAlt: "Переключатель режимов записи на PLAUD AI",
  },
  {
    id: 3,
    icon: Bluetooth,
    title: "Как синхронизировать с телефоном",
    tags: ["синхронизация", "приложение", "bluetooth", "передать", "файл"],
    text: "После записи откройте приложение PLAUD на смартфоне. Устройство автоматически подключится по Bluetooth и начнёт передачу файла. Дождитесь завершения синхронизации — это может занять от нескольких секунд до пары минут.",
    steps: [
      "Откройте приложение PLAUD на телефоне",
      "Убедитесь, что Bluetooth включён",
      "Дождитесь автоматического подключения",
      "Файл появится в списке записей после синхронизации",
    ],
    image: "/images/plaud/section-3.jpg",
    imageAlt: "Синхронизация PLAUD AI с приложением на телефоне",
  },
  {
    id: 4,
    icon: FileText,
    title: "Как запустить расшифровку",
    tags: ["расшифровка", "транскрипт", "generate", "кнопка", "текст"],
    text: "После синхронизации записи откройте нужный файл в приложении. Нажмите кнопку «Generate» или «Расшифровать». Система обработает аудио и выдаст текстовую расшифровку с разбивкой по спикерам.",
    steps: [
      "Откройте запись в приложении PLAUD",
      "Нажмите кнопку «Generate» (или «Расшифровать»)",
      "Дождитесь обработки — обычно 1–3 минуты",
      "Готовый транскрипт появится под аудиофайлом",
    ],
    image: "/images/plaud/section-4.jpg",
    imageAlt: "Расшифровка записи в приложении PLAUD AI",
  },
  {
    id: 5,
    icon: ListChecks,
    title: "Как получить краткое содержание",
    tags: ["саммари", "краткое", "содержание", "шаблон", "generate"],
    text: "После расшифровки вы можете сгенерировать саммари — краткое содержание встречи. Выберите один из шаблонов (протокол встречи, список задач, краткий пересказ) и нажмите «Generate».",
    steps: [
      "Откройте расшифровку записи",
      "Выберите шаблон саммари из списка",
      "Нажмите «Generate» для генерации",
      "Результат можно редактировать и экспортировать",
    ],
    image: "/images/plaud/section-5.jpg",
    imageAlt: "Генерация саммари в приложении PLAUD AI",
  },
  {
    id: 6,
    icon: UserRound,
    title: "Как переименовать спикеров",
    tags: ["спикер", "докладчик", "имя", "переименовать"],
    text: "В расшифровке спикеры отображаются как «Speaker 1», «Speaker 2» и т.д. Чтобы переименовать — нажмите на имя спикера в тексте и введите настоящее имя. PLAUD запомнит его для будущих записей.",
    steps: [
      "Откройте расшифровку с несколькими спикерами",
      "Нажмите на метку «Speaker N» в тексте",
      "Введите имя участника",
      "Имя сохранится и будет применяться автоматически",
    ],
    image: "/images/plaud/section-6.jpg",
    imageAlt: "Переименование спикеров в расшифровке PLAUD AI",
  },
  {
    id: 7,
    icon: Download,
    title: "Как скачать или поделиться файлом",
    tags: ["экспорт", "скачать", "pdf", "docx", "поделиться"],
    text: "Готовую расшифровку или саммари можно экспортировать в PDF, DOCX или скопировать текст. Нажмите иконку «Поделиться» или «Экспорт» в правом верхнем углу файла.",
    steps: [
      "Откройте нужную расшифровку или саммари",
      "Нажмите иконку экспорта (↑) в верхнем правом углу",
      "Выберите формат: PDF, DOCX или текст",
      "Файл сохранится или откроется меню отправки",
    ],
    image: "/images/plaud/section-7.jpg",
    imageAlt: "Экспорт и отправка файлов из PLAUD AI",
  },
  {
    id: 8,
    icon: FolderOpen,
    title: "Как организовать файлы по папкам",
    tags: ["папки", "организация", "переместить", "тег"],
    text: "В приложении PLAUD можно создавать папки и перемещать записи для удобной навигации. Используйте теги и папки, чтобы группировать записи по проектам, клиентам или темам.",
    steps: [
      "Перейдите в раздел «Записи» в приложении",
      "Создайте новую папку через меню «+»",
      "Перетащите или переместите записи в папку",
      "Добавьте теги для быстрого поиска",
    ],
    image: "/images/plaud/section-8.jpg",
    imageAlt: "Организация файлов по папкам в PLAUD AI",
  },
  {
    id: 9,
    icon: Mail,
    title: "AutoFlow: автоматическая отправка на почту",
    tags: ["autoflow", "автопилот", "автоматически", "почта", "email"],
    text: "Функция AutoFlow позволяет автоматически отправлять расшифровку и саммари на указанный email сразу после обработки записи. Настройте один раз — и получайте результаты без лишних действий.",
    steps: [
      "Откройте настройки приложения PLAUD",
      "Перейдите в раздел «AutoFlow»",
      "Укажите email для автоматической отправки",
      "Выберите шаблон саммари и формат экспорта",
    ],
    image: "/images/plaud/section-9.jpg",
    imageAlt: "Настройка AutoFlow в приложении PLAUD AI",
  },
  {
    id: 10,
    icon: CreditCard,
    title: "Тарифы и остаток минут",
    tags: ["тариф", "минуты", "подписка", "оплата", "membership"],
    text: "PLAUD предоставляет определённое количество минут расшифровки в зависимости от тарифного плана. Проверить остаток можно в настройках приложения. При необходимости — оформите подписку или докупите минуты.",
    steps: [
      "Откройте приложение и перейдите в «Профиль»",
      "Проверьте остаток минут в разделе «Подписка»",
      "Выберите подходящий тариф при необходимости",
      "Оплата производится через App Store или Google Play",
    ],
    image: "/images/plaud/section-10.jpg",
    imageAlt: "Тарифы и подписка PLAUD AI",
  },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Как пользоваться PLAUD AI диктофоном",
  "inLanguage": "ru",
  "description": "Пошаговая инструкция по PLAUD: запись, расшифровка, саммари, AutoFlow",
  "step": sections.map((s) => ({
    "@type": "HowToStep",
    "name": s.title,
    "text": s.text,
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
        s.tags.some((tag) => tag.includes(q)) ||
        s.text.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <PageTransition>
      <Helmet>
        <title>Инструкция по PLAUD на русском языке | Александра Моисеева</title>
        <meta
          name="description"
          content="Пошаговая инструкция по PLAUD AI на русском: запись, расшифровка, саммари, AutoFlow. Найдите ответ на любой вопрос по устройству."
        />
        <link rel="canonical" href="https://aleksamois.ru/materials/plaud-guide" />
        <meta property="og:title" content="Инструкция по PLAUD на русском языке" />
        <meta
          property="og:description"
          content="Полный гид по PLAUD AI: от записи до автоматической отправки на почту."
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
                placeholder="Например: как начать запись, как расшифровать файл, как поделиться..."
                className="pl-12 h-13 rounded-2xl shadow-md text-base"
              />
            </div>
            <Button
              onClick={() => {}}
              className="h-13 rounded-2xl px-6 shrink-0"
            >
              Найти
            </Button>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {filteredSections.map((section) => {
              const Icon = section.icon;
              return (
                <article
                  key={section.id}
                  data-tags={section.tags.join(" ")}
                  className="bg-card rounded-xl border border-border/30 p-6 md:p-8 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                      {section.title}
                    </h2>
                  </div>

                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    {section.text}
                  </p>

                  {section.steps && (
                    <div className="mb-5">
                      <h3 className="text-base font-medium text-foreground mb-3">
                        Пошаговая инструкция
                      </h3>
                      <ol className="list-decimal list-inside space-y-1.5 text-muted-foreground">
                        {section.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    loading="lazy"
                    className="rounded-lg w-full max-w-lg"
                  />
                </article>
              );
            })}
          </div>

          {/* No results */}
          {filteredSections.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                По вашему запросу ничего не найдено
              </p>
              <a
                href="https://t.me/aleksa_mois"
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
