import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Plus } from "lucide-react";
import { openTaskModal } from "@/components/CallbackModal";

interface CaseRef {
  title: string;
  text: string;
  metric?: string;
  to?: string;
}

interface Question {
  q: string;
  problem: string;
  change: string;
  caseRef?: CaseRef;
}

interface Industry {
  id: string;
  label: string;
  questions: Question[];
}

const industries: Industry[] = [
  {
    id: "production",
    label: "Производство",
    questions: [
      {
        q: "Заказы есть, а на каком этапе каждый — приходится выяснять по телефону?",
        problem:
          "Статус каждого заказа знает только тот, кто его ведёт. Каждый ваш вопрос — это прерванная работа сотрудника и лишний звонок.",
        change:
          "Заказы и их этапы собираются в одном рабочем поле. Картину по всем заказам видно без звонков, а сотрудники перестают дёргать друг друга.",
      },
      {
        q: "Инструкции и документация ищутся долго — сотрудники тратят часы на просмотр файлов?",
        problem:
          "Ответ на простой вопрос лежит в десятках документов, часто в рукописном виде или на другом языке.",
        change:
          "Нужный ответ находится за секунды прямо на рабочем месте — по QR-коду или запросу своими словами.",
        caseRef: {
          title: "QR-код на рабочем месте → ответ из документации за 3 секунды",
          text: "Для производственной компании собрали умный поиск по технической документации: текст, изображения, смешанные языки.",
          metric: "Экономия 150–350 тыс ₽/мес",
          to: "/cases/production-doc-search",
        },
      },
      {
        q: "Смены, наряды и задачи планируются в таблицах, которые никто не заполняет вовремя?",
        problem:
          "План живёт в файле, который каждый заполняет по-своему и когда вспомнит. Расхождения всплывают уже в работе.",
        change:
          "Задачи и смены заводятся в едином порядке, а вы видите, что запланировано, а что провисло, без ручной сверки.",
      },
      {
        q: "Отчёты к планёркам собираются вручную по крупицам из разных мест?",
        problem:
          "Перед каждой планёркой кто-то вручную обходит коллег и таблицы, чтобы собрать цифры.",
        change:
          "Данные собираются сами — планёрка начинается с готовой картины, а не с поиска цифр.",
      },
      {
        q: "Опыт лучших работников живёт только в головах — новички учатся месяцами?",
        problem:
          "Знания не записаны: уходит сотрудник — уходят и его знания, а новичок осваивает всё методом проб и ошибок.",
        change:
          "Опыт фиксируется в удобном виде, и новый сотрудник находит ответ сам, без долгих объяснений.",
      },
      {
        q: "Брак и переделки всплывают поздно — когда исправлять уже дорого?",
        problem:
          "Проблема видна на финальном этапе, когда цена ошибки максимальная.",
        change:
          "Контрольные точки подсвечивают отклонения раньше — исправлять дешевле и спокойнее.",
      },
    ],
  },
  {
    id: "transport",
    label: "Транспорт",
    questions: [
      {
        q: "Заявки приходят в мессенджеры, по почте и телефону — как ничего не потерять?",
        problem:
          "Заявки рассыпаны по личным чатам и почте. Одна забытая заявка — потерянный рейс и недовольный клиент.",
        change:
          "Заявки из любых каналов попадают в один рабочий поток — с понятным статусом и без потерь.",
        caseRef: {
          title: "Заявки голосом и текстом → сразу в рабочую таблицу",
          text: "Грузовой Экспресс: заявки принимаются голосом, из Telegram и Excel и попадают в единый рабочий поток. Руководитель получил понятный контроль.",
          metric: "0% потерь заявок · экономия 9–12 ч/нед",
          to: "/cases/cargo-express",
        },
      },
      {
        q: "Чтобы понять, где машина и что с рейсом, приходится обзванивать водителей?",
        problem:
          "Каждый вопрос о статусе — это звонок, который отвлекает водителя и занимает время диспетчера.",
        change:
          "Статусы рейсов видны в одном окне — без звонков и ожидания ответа.",
      },
      {
        q: "Командировки и разъездная работа оформляются в переписке — каждый раз заново?",
        problem:
          "Заявки, согласования и отчёты по поездкам живут в чатах, и каждый раз всё начинается с чистого листа.",
        change:
          "Типовые поездки оформляются по понятной схеме: заявка, согласование, отчёт — без ручной переписки.",
        caseRef: {
          title: "5 цифровых инструментов за 2 месяца — включая помощника для планёрок и командировок",
          text: "Для транспортной компании АкТрансСервис собрали рабочую архитектуру под реальные процессы: документы, контроль, планёрки, командировки.",
          metric: "1,7 млн ₽ сохранено за квартал",
          to: "/cases/aktransservice",
        },
      },
      {
        q: "Документы по рейсам оформляются вручную и теряются при передаче между сотрудниками?",
        problem:
          "Документы переходят из рук в руки и из чата в чат — теряются версии и время.",
        change:
          "Документы по рейсам идут по понятному маршруту — всегда известно, где документ и что с ним дальше.",
      },
      {
        q: "Клиент спрашивает про статус — а ответ приходится собирать у трёх сотрудников?",
        problem:
          "Пока вы собираете ответ, клиент ждёт и делает выводы о компании.",
        change:
          "Ответ по любой заявке находится за минуту — в одном месте, без обхода коллег.",
      },
      {
        q: "Топливо, ремонты, простои — расходы сводятся вручную из разных таблиц?",
        problem:
          "Сведения о расходах живут в разных местах, и реальная стоимость рейса видна только после ручной сводки.",
        change:
          "Расходы собираются в одну картину — стоимость рейса видна вовремя, а не постфактум.",
      },
    ],
  },
  {
    id: "construction",
    label: "Строительство",
    questions: [
      {
        q: "Чтобы узнать, что происходит на объекте, приходится постоянно звонить прорабу?",
        problem:
          "Объект живёт в звонках и чатах. Пока дозвонитесь — день прошёл, а картина всё равно приблизительная.",
        change:
          "Ход работ виден в одном месте: что сделано, что отстаёт, кто отвечает — без обзвона.",
      },
      {
        q: "О проблеме на объекте узнаёте, когда исправлять уже дороже?",
        problem:
          "Сигналы о сбоях тонут в ежедневной переписке и доходят до вас с опозданием.",
        change:
          "Отклонения подсвечиваются сразу — реагировать можно до того, как проблема стала дорогой.",
      },
      {
        q: "Материалы списываются, а по факту не сходится — и непонятно, где разрыв?",
        problem:
          "Списание и наличие живут в разных учётах, и разрыв видно только на инвентаризации.",
        change:
          "Приход, списание и остатки видны в связке — разрыв находится быстро и по адресу.",
      },
      {
        q: "Документы по объектам живут в бумагах и чатах — нужную версию не найти?",
        problem:
          "Акты, сметы и переписка по объекту разбросаны — поиск нужного документа занимает часы.",
        change:
          "Все документы по объекту — в одном месте, с понятным порядком версий и согласований.",
      },
      {
        q: "Подрядчики отчитываются кто как может — единой картины по объектам нет?",
        problem:
          "Каждый подрядчик присылает отчёт в своём формате, и сводить их приходится вручную.",
        change:
          "Отчёты приходят в едином виде — сравнивать подрядчиков и объекты можно на одной картине.",
      },
      {
        q: "Закрывающие документы собираются в конце месяца авралом?",
        problem:
          "Документы копятся до последнего, и конец месяца превращается в аврал с рисками.",
        change:
          "Документы оформляются по ходу работ — конец месяца проходит спокойно.",
      },
    ],
  },
  {
    id: "services",
    label: "Услуги",
    questions: [
      {
        q: "Клиенты обращаются, а кто ответил и кто отвечает за выполнение — непонятно?",
        problem:
          "Обращения теряются между сотрудниками, и клиент сам напоминает о себе — уже недовольный.",
        change:
          "У каждого обращения понятный ответственный и статус — ничего не теряется и не дублируется.",
        caseRef: {
          title: "Система распределения заявок для сиделок",
          text: "Заявки от клиентов распределяются между специалистами по понятным правилам — без потерь и личных договорённостей.",
        },
      },
      {
        q: "Заявки и обращения расползаются по личным чатам сотрудников?",
        problem:
          "Рабочие вопросы живут в личных переписках: сотрудник на больничном — история обращений пропадает вместе с ним.",
        change:
          "Общение с клиентами ведётся в общем рабочем поле — история сохраняется независимо от сотрудника.",
      },
      {
        q: "Расписание специалистов держится в голове администратора?",
        problem:
          "Пока администратор на месте — всё работает. Заболел или уволился — расписание рассыпается.",
        change:
          "Записи и расписание ведутся в одном порядке — любой сотрудник подхватывает работу без сбоя.",
      },
      {
        q: "Повторные клиенты теряются — некому вовремя напомнить о компании?",
        problem:
          "Клиент уходит молча — не из-за качества, а потому что о нём просто не вспомнили.",
        change:
          "Повторные визиты и напоминания происходят сами — клиенты возвращаются без ручной работы.",
      },
      {
        q: "Отчёт по выручке и загрузке собирается вручную раз в месяц?",
        problem:
          "Пока отчёт собран, ситуация уже изменилась — решения принимаются по устаревшим цифрам.",
        change:
          "Выручка и загрузка видны в любое время — решения принимаются по свежей картине.",
      },
      {
        q: "Перед покупкой дорогого решения непонятно, можно ли обойтись дешевле?",
        problem:
          "Под давлением обещаний легко купить дорогое, а потом годами оплачивать то, что работает вполсилы.",
        change:
          "Сначала считается экономика: иногда задача решается без крупной покупки — и это тоже наш результат.",
        caseRef: {
          title: "Отказ от покупки оборудования примерно за 1,5 млн ₽",
          text: "Крайпотребсоюз: архитектура решения позволила обойтись без покупки серверного оборудования. Время финансового отдела сэкономлено.",
          metric: "1,3 млн ₽ разовой экономии",
          to: "/cases/kraypotrebsoyuz",
        },
      },
    ],
  },
];

// Вопросы — не карточки, а «рукописные» строки: разный размер и лёгкий наклон,
// чтобы выглядело как хаотично написанные от руки заметки.
const questionStyles = [
  "text-2xl md:text-3xl md:rotate-[-1.2deg]",
  "text-xl md:text-2xl md:rotate-[0.8deg]",
  "text-2xl md:text-[1.7rem] md:rotate-[-0.6deg]",
  "text-xl md:text-2xl md:rotate-[1.1deg]",
  "text-2xl md:text-3xl md:rotate-[-0.9deg]",
  "text-xl md:text-[1.6rem] md:rotate-[0.7deg]",
];

const IndustryQuestions = () => {
  const [activeId, setActiveId] = useState(industries[0].id);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const industry = industries.find((i) => i.id === activeId) ?? industries[0];

  return (
    <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="max-w-3xl mb-10 md:mb-12">
        <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
          Отрасли
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-5">
          Узнаёте{" "}
          <span className="font-iriska font-normal italic text-accent">свой бизнес</span>?
        </h2>
        <p className="text-base md:text-lg text-muted-foreground">
          Выберите свою сферу и найдите задачи, которые каждый день приходится
          решать вам и вашей команде.
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5 md:gap-3 mb-4 md:mb-6">
        {industries.map((ind) => (
          <button
            key={ind.id}
            type="button"
            onClick={() => {
              setActiveId(ind.id);
              setOpenIdx(null);
            }}
            className={`px-5 md:px-6 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base border transition-all duration-300 ${
              activeId === ind.id
                ? "bg-accent border-accent text-accent-foreground shadow-card"
                : "bg-card border-border text-foreground hover:border-accent/60"
            }`}
          >
            {ind.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Нажмите на вопрос, чтобы увидеть, что можно сделать
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start">
        {industry.questions.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={item.q}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className={`rounded-2xl border bg-card p-5 md:p-6 shadow-card transition-all duration-300 cursor-pointer ${
                isOpen
                  ? "border-accent shadow-plate md:rotate-0"
                  : "border-border hover:border-accent/60 hover:shadow-soft"
              } ${spanClasses[idx % spanClasses.length]} ${
                idx % 2 === 0 ? "md:rotate-[-0.5deg]" : "md:rotate-[0.5deg]"
              } hover:md:rotate-0`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base md:text-lg font-semibold text-foreground leading-snug">
                  {item.q}
                </h3>
                <span
                  className={`shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "bg-accent border-accent text-accent-foreground rotate-45"
                      : "border-border text-accent"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </div>

              {isOpen && (
                <div className="mt-4 pt-4 border-t border-border space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-1">
                      Что решим
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-1">
                      Что изменится
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {item.change}
                    </p>
                  </div>

                  {item.caseRef && (
                    <div className="rounded-xl bg-accent/10 p-4">
                      <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-1.5">
                        Похожий проект
                      </p>
                      <p className="text-sm font-semibold text-foreground leading-snug">
                        {item.caseRef.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {item.caseRef.text}
                      </p>
                      {item.caseRef.metric && (
                        <p className="mt-2 text-sm font-semibold text-accent">
                          {item.caseRef.metric}
                        </p>
                      )}
                      {item.caseRef.to && (
                        <Link
                          to={item.caseRef.to}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-2 inline-flex items-center text-sm font-semibold text-accent hover:underline"
                        >
                          Читать кейс <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openTaskModal();
                    }}
                    className="group inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full font-semibold text-sm md:text-base shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 bg-accent text-accent-foreground hover:bg-primary-dark"
                  >
                    <span>Обсудить такую задачу</span>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-background text-foreground group-hover:translate-x-0.5 transition-transform">
                      <Phone className="h-3.5 w-3.5" />
                    </span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default IndustryQuestions;
