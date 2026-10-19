
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import { Helmet } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import PillButton from "@/components/PillButton";
import { caseForPath } from "@/data/caseStudies";
import { useNavigate, useParams } from "react-router-dom";
import AkTransServiceContent from "./AkTransServiceContent";
import NeuroTenderologContent from "./NeuroTenderologContent";
import BusinessCaseContent from "./BusinessCaseContent";
import { scrollToContact } from "@/lib/scrollToContact";

interface CaseData {
  slug: string;
  title: string;
  subtitle: string;
  targetAudience: string;
  industry: string;
  price: string;
  status: string;
  task: string;
  actions: string[];
  results: string[];
  quote?: string;
}

const casesData: Record<string, CaseData> = {
  "aktransservice": {
    slug: "aktransservice",
    title: "АкТрансСервис",
    subtitle: "Как связали документы, знания и рабочие процессы в одну цифровую систему",
    targetAudience: "транспортная компания, работа на вахте и в нефтегазовом секторе",
    industry: "Транспорт · Вахта · Нефтегаз",
    price: "—",
    status: "действующий",
    task: "Портал собирает документы и права доступа, Jarvis помогает сотрудникам работать с корпоративными знаниями, а автоматизации на локальном сервере сами проверяют данные и доставляют результат людям.",
    actions: [
      "Разобрали процессы, данные, документы и внутренние задачи компании",
      "Спроектировали и внедрили 5 цифровых инструментов за 2 месяца",
      "Собрали рабочую архитектуру под реальные процессы компании",
      "Отказались от дорогого внешнего решения в пользу архитектуры под задачу",
    ],
    results: [
      "Сохранено 1,7 млн ₽ за квартал",
      "5 рабочих цифровых инструментов под процессы компании",
      "Снижена ручная нагрузка на работу с 53 000 позиций",
    ],
  },
  "production-doc-search": {
    slug: "production-doc-search",
    title: "Поиск по технической документации производственной компании",
    subtitle: "QR-код на рабочем месте → ответ из документации за 3 секунды",
    targetAudience: "производственная компания",
    industry: "производство, документооборот",
    price: "—",
    status: "действующий",
    task: "Сотрудникам нужно было быстро находить ответы в технической документации, где встречались текст, изображения и смешанные языки. Поиск вручную занимал много времени и тормозил работу на участках.",
    actions: [
      "Разобрали структуру и форматы технической документации",
      "Создали интеллектуальный поиск с учётом текста, изображений и смешанных языков",
      "Развернули доступ к поиску по QR-коду прямо на рабочем месте",
      "Настроили выдачу релевантного ответа за секунды вместо ручного просмотра",
    ],
    results: [
      "Время ответа на технический запрос — 3 секунды",
      "Снижена зависимость от ручного поиска по документации",
    ],
  },
  "neurotenderolog": {
    slug: "neurotenderolog",
    title: "НейроТендеролог",
    subtitle: "Собственный программный сервис НейроРешений по подписке для отбора закупок",
    targetAudience: "компании, которые отбирают подходящие закупки",
    industry: "Закупки · Отбор закупок",
    price: "—",
    status: "в промышленной эксплуатации",
    task: "Уменьшить ручной просмотр закупок и повысить управляемость отбора. Это собственный сервис НейроРешений по подписке для компаний, работающих с закупками. Сервис развивается с 2025; текущая обновлённая версия в промышленной эксплуатации с июня 2026.",
    actions: [
      "Создали многоступенчатую фильтрацию закупок",
      "Добавили ИИ-оценку соответствия и углублённый разбор документации",
      "Настроили доставку карточек подходящих закупок в MAX",
    ],
    results: [
      "3 постоянных клиента, один пользуется сервисом более года",
      "Система просматривает до 750 закупок в день на одно направление. Это эксплуатационный показатель. Финансовый эффект оценивается отдельно",
      "Сервис анализирует закупки и передаёт подходящие варианты для решения специалиста. Оценка экономического эффекта требует данных об использовании сервиса",
    ],
  },
  "caregiver-matching": {
    slug: "caregiver-matching",
    title: "Система подбора и сопровождения сиделок",
    subtitle: "Telegram-бот и контур учёта в Google Таблицах для заявок на уход",
    targetAudience: "организация в сфере услуг по уходу; заказчик: конфиденциально",
    industry: "Услуги · Уход",
    price: "—",
    status: "реализован",
    task: "Организовать приём заявок на уход, подбор сиделок и сопровождение работы в едином контуре учёта. Заказчик: конфиденциально. Публичное описание основано на функциональности внедрённого решения.",
    actions: [
      "Реализовали Telegram-бот и контур учёта в Google Таблицах",
      "Настроили приём текстовых и голосовых заявок, формирование карточки и передачу на модерацию",
      "Настроили публикацию заявки с закрытыми контактными данными и закрепление за первой откликнувшейся сиделкой",
      "Реализовали фиксацию статусов, отчётов, договоров и оплат, отправку напоминаний",
    ],
    results: [
      "2025: год реализации решения",
      "Реализованы Telegram-бот и контур учёта в Google Таблицах с описанными функциями",
      "Оценка экономического эффекта требует данных о фактическом использовании решения",
    ],
  },
  "business-travel": {
    slug: "business-travel",
    title: "Автоматизация командировок",
    subtitle: "Решение для задач организации командировок",
    targetAudience: "две компании; заказчики: конфиденциально",
    industry: "Организация командировок",
    price: "—",
    status: "используется в рабочих процессах",
    task: "Решение применяется для задач организации командировок. Публичное описание ограничено подтверждёнными фактами внедрения и использования. Заказчики: конфиденциально. Публичная информация отражает факт внедрения и применения решения.",
    actions: [
      "Подобное решение внедрено в двух компаниях для задач организации командировок",
    ],
    results: [
      "Подобное решение внедрено в двух компаниях, используется в рабочих процессах, заказчики довольны результатом",
      "Два действующих внедрения. Оценка экономического эффекта требует дополнительных эксплуатационных данных",
    ],
  },
};

const CaseDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const caseData = slug ? casesData[slug] : null;
  const project = slug ? caseForPath(`/cases/${slug}`) : undefined;

  if (!caseData) {
    return (
      <PageTransition>
        <div className="min-h-screen">
          <div className="pt-32 pb-20 text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-4">Перейдите в каталог кейсов</h1>
            <Button onClick={() => navigate('/cases')}>Все кейсы</Button>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Кейс: {caseData.title} — Александра Моисеева</title>
        <meta name="description" content={`${caseData.subtitle}. ${caseData.task}`} />
        <link rel="canonical" href={`https://aleksamois.ru/cases/${caseData.slug}`} />
        <meta property="og:title" content={`Кейс: ${caseData.title} — Александра Моисеева`} />
        <meta property="og:description" content={`${caseData.subtitle}. ${caseData.task}`} />
        <meta property="og:url" content={`https://aleksamois.ru/cases/${caseData.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
      </Helmet>
      <div className="min-h-screen">
        
        <PageBreadcrumbs 
          currentPage={caseData.title} 
          parentPages={[{ label: "Кейсы", href: "/cases" }]} 
        />
        
        {slug === "aktransservice" ? (
          <>
            <AkTransServiceContent />
            <Partners />
            <Footer />
          </>
        ) : slug === "neurotenderolog" ? (
          <>
            <NeuroTenderologContent />
            <Partners />
            <Footer />
          </>
        ) : (
        <>
        <BusinessCaseContent story={caseData} project={project} />


        <Partners />
        <Footer />
        </>
        )}
      </div>
    </PageTransition>
  );
};

export default CaseDetailPage;
