import {
  Zap, Smartphone, Circle, Download, Monitor, User, CreditCard,
  Layout, FolderOpen, FileText, Play, AlignLeft, Layers,
  MessageSquare, Shield, HelpCircle, Star
} from "lucide-react";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";

export interface GuideSection {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tags: string;
  content: React.ReactNode;
}

/* ── Helper components ─────────────────────────────────── */

const Step = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <div className="flex items-start gap-3 rounded-xl bg-sky-50/70 px-4 py-3">
    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-semibold text-white">
      {n}
    </span>
    <span className="text-sm md:text-base text-slate-700 leading-relaxed">{children}</span>
  </div>
);

const Steps = ({ items }: { items: string[] }) => (
  <div className="space-y-3">
    {items.map((item, i) => (
      <Step key={i} n={i + 1}>{item}</Step>
    ))}
  </div>
);

const Warning = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
    <span className="shrink-0 text-lg leading-none mt-0.5">⚠️</span>
    <div><span className="font-semibold">Важно:</span> {children}</div>
  </div>
);

const Tip = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-3 rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-900">
    <span className="shrink-0 text-lg leading-none mt-0.5">💡</span>
    <div><span className="font-semibold">Подсказка:</span> {children}</div>
  </div>
);

/* ── Sections ──────────────────────────────────────────── */

export const sections: GuideSection[] = [
  /* ── Вводная ──────────────────────────────────────── */
  {
    id: 0,
    icon: Zap,
    title: "Что такое PLAUD — простыми словами",
    tags: "что такое plaud зачем нужен диктофон ии",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          Представьте: вы пришли на встречу, положили маленькую карточку на стол — и она сама записала весь разговор, сама превратила его в текст и сама выделила главное. Вы ничего не конспектировали, ничего не пропустили.
        </p>
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          Это и есть PLAUD — умный диктофон с искусственным интеллектом.
        </p>
        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Как это работает — три шага:</h3>
        <Steps items={[
          "Нажали кнопку — устройство записывает звук",
          "Открыли приложение — файл синхронизировался автоматически",
          "Нажали Generate — получили текст + краткое содержание + список задач",
        ]} />
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          Всё остальное делает искусственный интеллект: расшифровывает речь на 112 языках, определяет кто говорил, создаёт саммари по шаблону.
        </p>
      </div>
    ),
  },

  /* ── Часть 1 ─────────────────────────────────────── */
  {
    id: 1,
    icon: Smartphone,
    title: "Модели устройств — какую выбрать",
    tags: "модели note notepin выбрать купить цена",
    content: (
      <div className="space-y-5">
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          Все четыре модели работают с одним приложением и одним личным кабинетом. Разница — в форме и мощности:
        </p>
        <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Модель</TableHead>
                <TableHead>Как выглядит</TableHead>
                <TableHead>Для кого лучше всего</TableHead>
                <TableHead>Цена (РФ)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell className="font-medium">PLAUD Note</TableCell><TableCell>Тонкая карточка, крепится к телефону</TableCell><TableCell>Офисная работа, телефонные звонки</TableCell><TableCell>~29 680 ₽</TableCell></TableRow>
              <TableRow className="bg-gray-50"><TableCell className="font-medium">PLAUD Note Pro</TableCell><TableCell>Карточка с дисплеем, 4 микрофона</TableCell><TableCell>Большие залы, переговоры до 5 метров</TableCell><TableCell>уточнять</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">PLAUD NotePin</TableCell><TableCell>Значок-клипса на одежду</TableCell><TableCell>Лекции, интервью, работа в движении</TableCell><TableCell>~28 970 ₽</TableCell></TableRow>
              <TableRow className="bg-gray-50"><TableCell className="font-medium">PLAUD NotePin S</TableCell><TableCell>Клипса + тактильная кнопка</TableCell><TableCell>Те, кто пишет весь день, полный комплект</TableCell><TableCell>~46 000 ₽</TableCell></TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="flex gap-3 rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-900">
          <span className="shrink-0 text-lg leading-none mt-0.5">💡</span>
          <div>
            <p className="font-semibold mb-1">Не знаете что выбрать?</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Если работаете в офисе и часто разговариваете по телефону → <strong>Note</strong></li>
              <li>Если ходите на встречи, лекции, в разъезды → <strong>NotePin</strong></li>
              <li>Если проводите большие совещания в залах → <strong>Note Pro</strong></li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900 mb-2">Что общего у всех моделей:</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Память 64 ГБ — хватает на 240 дней записи по 2 часа в день</li>
            <li>Автоматическая расшифровка на 112 языках включая русский</li>
            <li>Работают с одним приложением на телефоне</li>
            <li>Один личный кабинет на сайте web.plaud.ai</li>
          </ul>
        </div>
      </div>
    ),
  },

  /* ── Часть 2 ─────────────────────────────────────── */
  {
    id: 2,
    icon: Circle,
    title: "Физические кнопки — что нажимать",
    tags: "кнопка запись старт стоп режим переключатель зарядка вибрация",
    content: (
      <div className="space-y-5">
        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Переключатель режимов (Note и Note Pro)</h3>
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          Маленький ползунок на боковой грани устройства. Смотрите на цвет:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li><strong>Серый цвет</strong> (ползунок вниз) = режим «Заметка / Встреча». Используйте когда: живой разговор, встреча за столом, лекция, диктовка.</li>
          <li><strong>Красный цвет</strong> (ползунок вверх) = режим «Телефонный звонок». Прикладываете устройство к задней крышке телефона.</li>
        </ul>
        <Warning>Сначала выберите нужный режим ползунком, и только потом нажимайте кнопку записи. Если перепутать режим — качество расшифровки будет плохим.</Warning>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Кнопка записи (центр устройства)</h3>
        <p className="text-muted-foreground leading-relaxed">Круглая кнопка на лицевой стороне. Она делает два действия:</p>
        <div className="space-y-3">
          <p className="font-medium text-foreground">Чтобы начать запись:</p>
          <Steps items={[
            "Зажмите кнопку и держите 1 секунду",
            "Почувствуете одну вибрацию — «запись началась»",
            "Отпустите кнопку — устройство пишет",
          ]} />
          <p className="font-medium text-foreground">Чтобы остановить запись:</p>
          <Steps items={[
            "Снова зажмите кнопку и держите 1 секунду",
            "Почувствуете две вибрации — «запись сохранена»",
            "Файл готов к синхронизации с телефоном",
          ]} />
        </div>
        <Tip>Одна вибрация = старт, две вибрации = стоп. Как кнопка на диктофоне, только умная.</Tip>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">NotePin: одна кнопка делает всё</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Зажать 1 секунду → запись началась (одна вибрация)</li>
          <li>Зажать 1 секунду снова → запись остановлена (две вибрации)</li>
          <li>Короткое нажатие во время записи → отметить важный момент</li>
        </ul>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Зарядка устройства</h3>
        <p className="text-muted-foreground leading-relaxed max-w-prose">Зарядка — магнитным кабелем USB-C из комплекта. Время работы от одной зарядки:</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li><strong>Note / Note Pro:</strong> до 30 часов записи, 60 дней ожидания</li>
          <li><strong>NotePin / NotePin S:</strong> до 20 часов записи, 40 дней ожидания</li>
        </ul>
        <p className="text-sm text-muted-foreground">Для сравнения: 30 часов — это 15 рабочих дней по 2 часа встреч. Заряжать примерно раз в 2 недели.</p>
      </div>
    ),
  },

  /* ── Часть 3 ─────────────────────────────────────── */
  {
    id: 3,
    icon: Download,
    title: "Приложение PLAUD AI — первый запуск",
    tags: "приложение скачать установить регистрация bluetooth синхронизация расшифровка generate",
    content: (
      <div className="space-y-5">
        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Шаг 1: Скачать приложение</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Для iPhone (iOS): App Store → поиск «PLAUD AI» → «Загрузить»</li>
          <li>Для Android: Google Play → поиск «PLAUD AI» → «Установить»</li>
        </ul>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Шаг 2: Зарегистрироваться</h3>
        <p className="text-muted-foreground leading-relaxed">Откройте приложение. Нажмите «Sign Up». Три способа:</p>
        <ol className="list-decimal list-inside text-muted-foreground space-y-1">
          <li>Через Google — кнопка с буквой G (быстрее всего)</li>
          <li>Через Apple ID — кнопка с яблоком (для iPhone)</li>
          <li>Email и пароль — введите свой email, придумайте пароль</li>
        </ol>
        <Warning>Запомните логин и пароль — они же понадобятся когда будете заходить в личный кабинет на компьютере через web.plaud.ai</Warning>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Шаг 3: Подключить устройство к телефону</h3>
        <Steps items={[
          "Включите Bluetooth на телефоне",
          "Откройте приложение PLAUD AI",
          "Нажмите «Connect» в левом верхнем углу",
          "На устройстве PLAUD: зажмите кнопку записи до белой вспышки — это режим поиска связи",
          "Приложение автоматически найдёт устройство и подключится",
        ]} />

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Шаг 4: Синхронизировать записи</h3>
        <Steps items={[
          "Откройте приложение на телефоне",
          "Убедитесь что Bluetooth включён",
          "Файл появится в списке записей автоматически через 5–30 секунд",
          "Рядом с файлом будет надпись «Not transcribed» (Не расшифровано)",
        ]} />
        <Tip>Если файл не появился: нажмите значок устройства → кнопка «Sync» (Синхронизировать вручную).</Tip>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Шаг 5: Запустить расшифровку</h3>
        <Steps items={[
          "Нажмите на нужный файл в списке",
          "Нажмите большую кнопку «Generate» по центру экрана",
          "Выберите шаблон саммари (Meeting Notes, Key Points, Action Items и др.)",
          "Выберите язык расшифровки: Russian / Русский",
          "Нажмите «Generate Now»",
          "Подождите 1–3 минуты — расшифровка готова",
        ]} />
      </div>
    ),
  },

  /* ── Часть 4 ─────────────────────────────────────── */
  {
    id: 4,
    icon: Monitor,
    title: "Личный кабинет web.plaud.ai — вход",
    tags: "личный кабинет сайт web компьютер войти главная страница",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          Откройте любой браузер на компьютере (Chrome, Edge, Safari, Firefox). Введите адрес: <strong>web.plaud.ai</strong>. Войдите с тем же логином и паролем, что использовали в приложении на телефоне.
        </p>
        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Что вы увидите на главной странице:</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li><strong>Recent files</strong> (Последние файлы) — записи в хронологическом порядке, новые сверху</li>
          <li>Длительность каждой записи (1h 27m 53s)</li>
          <li>Дата и время создания</li>
          <li>Папка, в которой лежит файл (цветные метки)</li>
          <li>Кнопка ⋯ (три точки) у каждого файла — меню действий</li>
        </ul>
      </div>
    ),
  },

  /* ── Часть 5 ─────────────────────────────────────── */
  {
    id: 5,
    icon: User,
    title: "Меню профиля — тариф и настройки",
    tags: "профиль меню настройки тариф выйти скачать",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          Нажмите на своё имя в левом верхнем углу (аватар и имя пользователя). Выпадет меню:
        </p>
        <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Пункт меню</TableHead>
                <TableHead>Что он делает</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell className="font-medium">Settings (Настройки)</TableCell><TableCell>Язык интерфейса, язык расшифровки по умолчанию, уведомления, синхронизация</TableCell></TableRow>
              <TableRow className="bg-gray-50"><TableCell className="font-medium">Membership Center (Центр подписки)</TableCell><TableCell>Ваш тариф, остаток минут, статистика использования</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">Help Center (Центр помощи)</TableCell><TableCell>База знаний PLAUD — статьи и инструкции на английском</TableCell></TableRow>
              <TableRow className="bg-gray-50"><TableCell className="font-medium">Download (Скачать)</TableCell><TableCell>Скачать десктопное приложение для Mac или Windows</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">Sign out (Выйти)</TableCell><TableCell>Выйти из аккаунта</TableCell></TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    ),
  },

  /* ── Часть 6 ─────────────────────────────────────── */
  {
    id: 6,
    icon: CreditCard,
    title: "Membership Center — тарифы и статистика",
    tags: "тариф минуты subscription membership центр подписка quota статистика",
    content: (
      <div className="space-y-5">
        <p className="text-muted-foreground leading-relaxed max-w-prose">Нажмите на имя → Membership Center. Откроется страница тарифного плана:</p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Блок тарифа (слева вверху)</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li><strong>Unlimited (Trial)</strong> — пробный безлимитный период</li>
          <li>∞ Unlimited minutes — в пробный период минуты не ограничены</li>
          <li>Next: Annual subscription — что будет после пробного периода</li>
          <li>Starts / Expires — даты начала и окончания триала</li>
        </ul>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Transcription quota (справа вверху)</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Остаток минут / общее количество минут для расшифровки</li>
          <li>Expires — до какой даты действуют эти минуты</li>
        </ul>
        <p className="text-sm text-muted-foreground">Это отдельный пакет минут, который можно докупать помимо основного тарифа.</p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Три карточки статистики</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li><strong>Days</strong> — сколько дней вы пользуетесь PLAUD</li>
          <li><strong>Recordings</strong> — сколько всего записей сделали</li>
          <li><strong>Hours</strong> — суммарное количество часов записи</li>
        </ul>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Usage insights (Аналитика)</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Daily average usage — среднее время записи в день за текущий месяц</li>
          <li>Изменение по сравнению с предыдущим месяцем (↑ = больше, ↓ = меньше)</li>
          <li>Peak active hours — ваше самое продуктивное время для записей</li>
          <li>Тепловая карта — активность по дням</li>
        </ul>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Billing & subscription</h3>
        <p className="text-muted-foreground leading-relaxed">Кнопка в правом верхнем углу. Здесь: меняете тариф, вводите промокод, смотрите историю платежей, докупаете пакеты минут.</p>
      </div>
    ),
  },

  /* ── Часть 7 ─────────────────────────────────────── */
  {
    id: 7,
    icon: Layout,
    title: "Левая боковая панель — навигация",
    tags: "панель меню поиск главная спроси шаблоны explore добавить аудио",
    content: (
      <div className="space-y-5">
        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">➕ Add audio (Добавить аудио)</h3>
        <p className="text-muted-foreground leading-relaxed">Загружает аудиофайл с компьютера для расшифровки (MP3, WAV, M4A). Когда нужно: запись из Zoom, Teams, WhatsApp или другого диктофона.</p>
        <Steps items={[
          "Нажмите «+ Add audio»",
          "Откроется окно выбора файла",
          "Выберите аудиофайл → «Открыть»",
          "Файл появится в списке — расшифровывайте как обычно",
        ]} />

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">🔍 Search (Поиск)</h3>
        <p className="text-muted-foreground leading-relaxed">Ищет слова внутри всех расшифровок — не только по названию файла, а по содержанию разговоров.</p>
        <Steps items={[
          "Нажмите «Search» в левом меню",
          "Введите слово или фразу: «Петров», «договор», «бюджет 2026»",
          "Система покажет все файлы где это слово встречается",
          "Под названием файла — цитата с вашим словом",
        ]} />

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">🏠 Home (Главная)</h3>
        <p className="text-muted-foreground leading-relaxed">Возвращает на главную страницу со списком последних файлов. Нажимайте когда хотите вернуться к списку записей.</p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">✨ Ask Plaud (Спроси Плейд)</h3>
        <p className="text-muted-foreground leading-relaxed">ИИ-помощник, который знает содержание ВСЕХ ваших записей сразу. Чем отличается от поиска: поиск ищет точные слова, а Ask Plaud понимает смысл вопроса.</p>
        <Tip>
          Примеры вопросов: «Что мы решили по бюджету на последних трёх встречах?», «Кто упоминал Иванова в феврале?», «Какие задачи поставили на этой неделе?», «Что мы обещали клиенту в январе?», «Были ли разногласия по срокам проекта?»
        </Tip>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">📋 Template Community (Библиотека шаблонов)</h3>
        <p className="text-muted-foreground leading-relaxed">Готовые шаблоны саммари от других пользователей: продажи, медицина, образование, юристы, HR.</p>
        <Steps items={[
          "Нажмите «Template Community»",
          "Просматривайте шаблоны — каждый показывает пример результата",
          "Нашли подходящий → нажмите «Use» (Использовать)",
          "Шаблон сохранится в ваш личный список",
          "При следующей расшифровке — выберите его в меню шаблонов",
        ]} />

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">🔭 Explore (Исследовать)</h3>
        <p className="text-muted-foreground leading-relaxed">Публичные примеры записей и кейсов от сообщества PLAUD. Зачем: посмотреть как другие пользователи применяют PLAUD в работе.</p>
      </div>
    ),
  },

  /* ── Часть 8 ─────────────────────────────────────── */
  {
    id: 8,
    icon: FolderOpen,
    title: "Папки — как организовать файлы",
    tags: "папки организация переместить создать корзина trash unfiled",
    content: (
      <div className="space-y-5">
        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Системные разделы</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li><strong>All files</strong> — все файлы в одном месте</li>
          <li><strong>Unfiled</strong> — файлы без папки</li>
          <li><strong>Trash</strong> — корзина. Удалённые файлы хранятся здесь 30 дней, потом удаляются навсегда!</li>
        </ul>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Comes from (Источник записи)</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li><strong>Note mode</strong> — записи с физического устройства PLAUD</li>
          <li><strong>Import</strong> — файлы, загруженные вручную через «Add audio»</li>
        </ul>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Как создать новую папку</h3>
        <Steps items={[
          "Наведите мышку на слово «Folders» в левом меню",
          "Справа появится значок «+»",
          "Нажмите на плюс",
          "Введите название папки (например: «Клиенты 2026»)",
          "Нажмите Enter — папка создана",
        ]} />

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Как переместить файл в папку</h3>
        <p className="font-medium text-foreground text-sm">Вариант 1 — через три точки:</p>
        <ol className="list-decimal list-inside text-muted-foreground space-y-1 text-sm">
          <li>Нажмите на ⋯ (три точки) справа от названия файла</li>
          <li>Выберите «Move to folder»</li>
          <li>Выберите нужную папку</li>
        </ol>
        <p className="font-medium text-foreground text-sm mt-2">Вариант 2 — перетаскивание:</p>
        <ol className="list-decimal list-inside text-muted-foreground space-y-1 text-sm">
          <li>Зажмите левую кнопку мыши на файле</li>
          <li>Перетащите на нужную папку в левом меню</li>
          <li>Отпустите — файл переместился</li>
        </ol>
      </div>
    ),
  },

  /* ── Часть 9 ─────────────────────────────────────── */
  {
    id: 9,
    icon: FileText,
    title: "Открытый файл — кнопки действий",
    tags: "экспорт скачать share поделиться ссылка три точки переименовать удалить",
    content: (
      <div className="space-y-5">
        <p className="text-muted-foreground leading-relaxed max-w-prose">Кликните на файл в списке — он откроется. Сверху — кнопки действий:</p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">📄 Export (Экспорт)</h3>
        <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Что экспортируем</TableHead>
                <TableHead>Форматы</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell className="font-medium">Транскрипт (полный текст)</TableCell><TableCell>TXT, DOCX, PDF, SRT (субтитры)</TableCell></TableRow>
              <TableRow className="bg-gray-50"><TableCell className="font-medium">Саммари (краткое содержание)</TableCell><TableCell>TXT, Markdown, DOCX, PDF</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">Mind map (интеллект-карта)</TableCell><TableCell>PNG, Markdown</TableCell></TableRow>
              <TableRow className="bg-gray-50"><TableCell className="font-medium">Аудио (оригинальная запись)</TableCell><TableCell>MP3</TableCell></TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-sm text-muted-foreground">Дополнительно: ✅ «Include timestamps» — временные метки, ✅ «Include speaker names» — имена спикеров.</p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">🔗 Share (Поделиться)</h3>
        <Steps items={[
          "Нажмите кнопку «Share»",
          "Включите переключатель «Public link»",
          "Скопируйте появившуюся ссылку",
          "Отправьте коллеге через email, мессенджер или SMS",
        ]} />
        <p className="text-sm text-muted-foreground">Получатель увидит транскрипт, саммари и сможет слушать аудио — без регистрации. Чтобы отозвать доступ: снова нажмите «Share» → выключите «Public link».</p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">⋯ Три точки (More)</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li><strong>Rename</strong> — переименовать файл</li>
          <li><strong>Move to folder</strong> — переместить в другую папку</li>
          <li><strong>Add tag</strong> — добавить тег-ярлык (#срочно, #клиент-петров)</li>
          <li><strong>Merge</strong> — объединить несколько файлов в один</li>
          <li><strong>Delete</strong> — удалить файл (попадёт в Trash)</li>
        </ul>
      </div>
    ),
  },

  /* ── Часть 10 ────────────────────────────────────── */
  {
    id: 10,
    icon: Play,
    title: "Плеер — синхронизация аудио и текста",
    tags: "плеер воспроизведение скорость перемотка синхронизация таймкод",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          Главная фишка: расшифровка полностью синхронизирована с аудио. Кликните на любую строку в тексте — плеер автоматически прыгнет к этому моменту записи.
        </p>
        <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Элемент</TableHead>
                <TableHead>Что делает</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell className="font-medium">Таймкод</TableCell><TableCell>Слева — текущая позиция, справа — общая длина</TableCell></TableRow>
              <TableRow className="bg-gray-50"><TableCell className="font-medium">◀◀</TableCell><TableCell>Перемотать назад на 15 секунд</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">▶ / ⏸</TableCell><TableCell>Запустить воспроизведение или поставить на паузу</TableCell></TableRow>
              <TableRow className="bg-gray-50"><TableCell className="font-medium">▶▶</TableCell><TableCell>Перемотать вперёд на 15 секунд</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">🕐 Скорость</TableCell><TableCell>Изменить скорость: 0.5x (медленно) до 2x (быстро)</TableCell></TableRow>
              <TableRow className="bg-gray-50"><TableCell className="font-medium">📋 Синхронизация</TableCell><TableCell>Связь текста и аудио — кликабельные строки</TableCell></TableRow>
            </TableBody>
          </Table>
        </div>
        <Tip>Поставьте скорость 1.5x и прослушайте часовую встречу за 40 минут — не пропуская ни одного слова.</Tip>
      </div>
    ),
  },

  /* ── Часть 11 ────────────────────────────────────── */
  {
    id: 11,
    icon: AlignLeft,
    title: "Стенограмма (Transcript) — полный текст",
    tags: "стенограмма транскрипт спикер докладчик переименовать редактировать поиск",
    content: (
      <div className="space-y-5">
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          Полная расшифровка разговора с временными метками. Каждая реплика начинается с времени и имени спикера.
        </p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Как переименовать спикеров</h3>
        <p className="text-muted-foreground text-sm">PLAUD автоматически разделяет голоса. В транскрипте они будут «Докладчик 1», «Speaker 1» и т.д.</p>
        <Steps items={[
          "Найдите в тексте строку «Докладчик 1» или «Speaker 1»",
          "Кликните на это название — появится поле для ввода",
          "Введите настоящее имя (например: «Александр»)",
          "Нажмите Enter",
          "Система заменит все реплики этого спикера по всему документу",
        ]} />
        <Tip>Не нужно менять каждую реплику — меняете один раз в начале, остальное заменяется автоматически.</Tip>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Как редактировать текст</h3>
        <p className="text-muted-foreground leading-relaxed">Если ИИ неправильно распознал слово: кликните на слово в тексте, исправьте вручную. Изменение сохранится автоматически.</p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Как искать внутри файла</h3>
        <p className="text-muted-foreground leading-relaxed">Используйте поиск браузера: <strong>Ctrl+F</strong> (Windows) или <strong>Cmd+F</strong> (Mac). Браузер подсветит все места где слово встречается.</p>
      </div>
    ),
  },

  /* ── Часть 12 ────────────────────────────────────── */
  {
    id: 12,
    icon: Layers,
    title: "Саммари (Summary) — краткое содержание",
    tags: "саммари краткое содержание шаблон generate перегенерировать вкладки action items",
    content: (
      <div className="space-y-5">
        <p className="text-muted-foreground leading-relaxed max-w-prose">Автоматически созданное краткое содержание встречи.</p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Доступные шаблоны</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-foreground text-sm mb-2">Стандартные:</p>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
              <li>Meeting Notes — протокол встречи</li>
              <li>Key Points — ключевые моменты</li>
              <li>Action Items — список задач</li>
              <li>Summary — общее резюме</li>
              <li>Mind Map — интеллект-карта</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-foreground text-sm mb-2">Профессиональные:</p>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
              <li>Sales BANT — для продажников</li>
              <li>SOAP Notes — для врачей</li>
              <li>Interview Questions — из интервью</li>
              <li>Lecture Summary — конспект лекции</li>
              <li>Project Status — статус проекта</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">И ещё 10 000+ шаблонов из сообщества.</p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Как изменить шаблон саммари</h3>
        <Steps items={[
          "Нажмите на название текущего шаблона вверху вкладки Summary",
          "Откроется выпадающий список шаблонов",
          "Выберите нужный (например: «Action Items» вместо «Meeting Notes»)",
          "Нажмите «Regenerate» (Перегенерировать)",
          "Через 30–60 секунд — новое саммари готово",
        ]} />
        <Tip>Перегенерация не тратит дополнительные минуты — это просто другой взгляд на тот же файл.</Tip>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Кнопка ➕ — добавить ещё одну вкладку</h3>
        <p className="text-muted-foreground leading-relaxed">Нажмите «+» рядом с вкладками — добавится ещё одна вкладка саммари. Держите одновременно несколько видов для одного файла:</p>
        <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
          <li>Вкладка 1: «Meeting Notes» — общий протокол</li>
          <li>Вкладка 2: «Action Items» — список задач</li>
          <li>Вкладка 3: «Email to Client» — черновик письма клиенту</li>
        </ul>
      </div>
    ),
  },

  /* ── Часть 13 ────────────────────────────────────── */
  {
    id: 13,
    icon: MessageSquare,
    title: "Ask Plaud по файлу — ИИ-помощник",
    tags: "спроси плейд ask чат вопрос задачи письмо пункты действий",
    content: (
      <div className="space-y-5">
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          Нажмите «Спроси Плейд» в правом верхнем углу файла — справа выедет боковая панель.
        </p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Готовые вопросы</h3>
        <p className="text-muted-foreground leading-relaxed">Система анализирует содержание и сама предлагает 2–3 релевантных вопроса: «Какие главные решения были приняты?», «Кто за что отвечает?», «Какие риски упоминались?»</p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Своё поле ввода</h3>
        <p className="text-muted-foreground leading-relaxed">Пишите вопросы на русском языке в поле внизу панели.</p>
        <Tip>
          Примеры: «Перечисли все цифры и суммы», «Кто выразил несогласие?», «Были ли упомянуты дедлайны?», «Что решили по бюджету?», «Напиши follow-up письмо по итогам»
        </Tip>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Три быстрые кнопки</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li><strong>📝 Черновик письма</strong> — ИИ напишет готовое follow-up письмо на основе разговора. Остаётся скопировать в почту и отправить.</li>
          <li><strong>✅ Задачи</strong> — вытащит все задачи: кто поставил, кто должен выполнить, и сроки.</li>
          <li><strong>📌 Подтвердите пункты действий</strong> — список договорённостей в формате чек-листа: «✅ Решено: [что именно]».</li>
        </ul>
      </div>
    ),
  },

  /* ── Часть 14 ────────────────────────────────────── */
  {
    id: 14,
    icon: Zap,
    title: "AutoFlow — полный автопилот",
    tags: "autoflow автопилот автоматически email почта keyword триггер настройка",
    content: (
      <div className="space-y-5">
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          AutoFlow — самая мощная функция. Один раз настроили правило → дальше PLAUD сам расшифровывает, сам делает саммари и сам отправляет на почту — без единого нажатия.
        </p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Как это работает — пример</h3>
        <div className="rounded-xl bg-slate-50 p-4 space-y-2">
          <p className="text-muted-foreground text-sm">Вы сказали слово «встреча» в первые 60 секунд записи → PLAUD автоматически:</p>
          <Steps items={[
            "Расшифровал аудио на русский язык",
            "Сделал протокол встречи по шаблону",
            "Отправил вам на email к концу рабочего дня",
          ]} />
          <p className="text-muted-foreground text-sm">Вы ничего не нажимали. Просто открыли почту — а там готовый протокол.</p>
        </div>

        <Warning>AutoFlow настраивается только в мобильном приложении PLAUD AI, не в веб-версии.</Warning>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Шаги настройки</h3>
        <Steps items={[
          "Откройте приложение PLAUD AI на телефоне",
          "Нажмите на иконку настроек (шестерёнка)",
          "Найдите раздел «AutoFlow» — нажмите на него",
          "Нажмите «+ Add AutoFlow» (Добавить правило)",
        ]} />

        <div className="space-y-3 mt-2">
          <p className="font-medium text-foreground">Настройте WHEN (Когда срабатывает):</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
            <li><strong>Keyword</strong> — ключевое слово в начале записи (скажите в первую минуту)</li>
            <li><strong>Duration</strong> — если запись длиннее N минут</li>
            <li><strong>Any recording</strong> — для всех записей подряд</li>
          </ul>
          <p className="font-medium text-foreground">Настройте DO (Что сделать):</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
            <li>Выберите модель ИИ (GPT-5, Claude Sonnet 4, Gemini 2.5 Pro)</li>
            <li>Send to email — введите свой email</li>
          </ul>
        </div>

        <Steps items={[
          "Выберите триггер и параметры",
          "Выберите модель ИИ и шаблон",
          "Нажмите «Save» (Сохранить)",
        ]} />

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Пример реального использования</h3>
        <p className="text-sm text-muted-foreground"><strong>Настройка:</strong> WHEN — сказал слово «клиент», DO — расшифровать на русском, шаблон «Sales BANT», модель GPT-5, отправить на email.</p>
        <Steps items={[
          "Нажали запись на устройстве",
          "Сказали: «Клиент Иванов, разговор о контракте»",
          "Провели встречу",
          "Остановили запись (две вибрации)",
          "Открыли приложение для синхронизации",
          "Через 5–10 минут на почте — готовый BANT-отчёт по клиенту",
        ]} />
      </div>
    ),
  },

  /* ── Часть 15 ────────────────────────────────────── */
  {
    id: 15,
    icon: Star,
    title: "Тарифы — бесплатный и платные",
    tags: "тариф бесплатно минуты 300 платный upgrade план",
    content: (
      <div className="space-y-5">
        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Стартовый план (бесплатно навсегда)</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>300 минут расшифровки в месяц = примерно 5 часов встреч</li>
          <li>Все основные функции: транскрипт, саммари, экспорт, Ask Plaud, AutoFlow, шаблоны</li>
          <li>Mind map интеллект-карты</li>
          <li>Доступ к библиотеке шаблонов сообщества</li>
        </ul>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Когда кончатся минуты:</h3>
        <p className="text-muted-foreground leading-relaxed">Записи будут синхронизироваться, но кнопка «Generate» не будет работать до начала следующего месяца.</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Подождать начала следующего месяца — счётчик обнулится</li>
          <li>Или перейти на платный план прямо сейчас</li>
        </ul>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Платные планы</h3>
        <p className="text-muted-foreground leading-relaxed">Подключаются: Settings → Membership Center → Upgrade Plan.</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Безлимитные минуты расшифровки</li>
          <li>Приоритетная обработка (быстрее генерация)</li>
          <li>Расширенные модели ИИ (GPT-5, Claude Sonnet 4)</li>
          <li>Командные функции (для компаний)</li>
        </ul>
        <p className="text-sm text-muted-foreground">Актуальные цены смотрите в приложении — тарифы регулярно обновляются.</p>
      </div>
    ),
  },

  /* ── Часть 16 ────────────────────────────────────── */
  {
    id: 16,
    icon: CreditCard,
    title: "Как оплатить подписку из России",
    tags: "оплата россия карта рубли oplata zabugor plaud.ru юрлицо счёт",
    content: (
      <div className="space-y-5">
        <Warning>Карты российских банков на сайте PLAUD напрямую не проходят из-за международных ограничений.</Warning>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Проверенный способ — OplataZabugor.ru</h3>
        <Steps items={[
          "Напишите в Telegram: @OplataZabugor",
          "Скажите что нужно оплатить подписку PLAUD",
          "Они помогут с оплатой через доступные для России методы",
          "Работают с 08:00 до 00:00 по московскому времени",
          "Помогают с оплатой подписок, зарубежных сервисов, бронирований",
        ]} />
        <p className="text-sm text-muted-foreground">Сервис проверен годами практики, официальный Telegram-канал.</p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Альтернативный вариант — plaud.ru</h3>
        <p className="text-muted-foreground leading-relaxed">Официальный дилер в России:</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Оплата в рублях картой российского банка</li>
          <li>Доставка по России 1–3 рабочих дня</li>
          <li>Оплата по счёту для юридических лиц</li>
          <li>Email для юрлиц: plaud.ru.official@gmail.com с темой «Оплата по счёту»</li>
        </ul>
        <p className="text-sm text-muted-foreground">В комплекте с устройством идут бонусные минуты расшифровки.</p>
      </div>
    ),
  },

  /* ── Часть 17 ────────────────────────────────────── */
  {
    id: 17,
    icon: Shield,
    title: "Безопасность данных",
    tags: "безопасность данные сертификат шифрование конфиденциальность синхронизация облако",
    content: (
      <div className="space-y-5">
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          Для тех кто записывает конфиденциальные переговоры, коммерческую тайну, персональные данные клиентов:
        </p>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Сертификаты защиты</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li><strong>SOC 2 Type 2</strong> — стандарт безопасности облачных сервисов</li>
          <li><strong>HIPAA</strong> — медицинский стандарт (можно записывать информацию о пациентах)</li>
          <li><strong>GDPR</strong> — европейский стандарт защиты персональных данных</li>
          <li><strong>ISO 27001</strong> — международный стандарт информационной безопасности</li>
          <li><strong>ISO 27701</strong> — стандарт управления конфиденциальностью</li>
          <li><strong>EN 18031</strong> — немецкий стандарт для ИИ-систем</li>
        </ul>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Что это значит на практике</h3>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Все данные зашифрованы при передаче и хранении</li>
          <li>Ваши записи не используются для обучения ИИ-моделей</li>
          <li>Данные не передаются третьим лицам</li>
        </ul>

        <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">Как отключить облачную синхронизацию</h3>
        <Steps items={[
          "Откройте приложение на телефоне",
          "Settings → Cloud Sync (Облачная синхронизация)",
          "Выключите переключатель → Off",
        ]} />
        <p className="text-sm text-muted-foreground">С этого момента записи остаются только на физическом устройстве и не загружаются в облако.</p>
      </div>
    ),
  },
];

/* ── FAQ items for Part 18 ─────────────────────────── */

export const faqItems: { question: string; answer: string }[] = [
  {
    question: "Можно ли использовать PLAUD без интернета?",
    answer: "Да, само устройство пишет без интернета — хватает внутренней памяти 64 ГБ. Но расшифровка и ИИ-саммари требуют интернета — они делаются в облаке.",
  },
  {
    question: "Какая точность расшифровки русского языка?",
    answer: "PLAUD использует модели GPT-5, Claude Sonnet 4, Gemini 2.5 Pro — это самые точные ИИ-модели на март 2026 года. Точность русского языка ~95–98% при хорошем качестве записи.",
  },
  {
    question: "Можно ли редактировать текст расшифровки?",
    answer: "Да, кликайте прямо на слово в транскрипте и исправляйте вручную. Изменение сохраняется автоматически.",
  },
  {
    question: "Сколько человек может говорить одновременно?",
    answer: "ИИ распознаёт до 10 разных голосов в одной записи. Для оптимального качества — до 5 спикеров.",
  },
  {
    question: "Работает ли PLAUD на совещаниях в Zoom или Teams?",
    answer: "Да. Включите звук совещания на колонках компьютера → положите PLAUD рядом → запишите. Или загрузите аудиофайл из Zoom через «Add audio».",
  },
  {
    question: "Можно ли использовать PLAUD для записи лекций?",
    answer: "Да, для этого лучше подходит PLAUD NotePin — прикрепите к одежде и пишите весь день. Есть специальный шаблон «Lecture Summary» (Конспект лекции).",
  },
  {
    question: "Сколько языков поддерживает PLAUD?",
    answer: "112 языков включая русский, английский, казахский, узбекский, украинский, белорусский, армянский и другие.",
  },
  {
    question: "Можно ли записывать телефонные звонки на iPhone?",
    answer: "Да. Переключите PLAUD в режим «Звонок» (красный цвет), приложите к задней крышке iPhone во время разговора. Устройство запишет обе стороны разговора.",
  },
  {
    question: "Как долго хранятся записи в облаке?",
    answer: "Бессрочно, пока у вас активен аккаунт. Удалённые файлы хранятся в Trash 30 дней — потом удаляются навсегда.",
  },
  {
    question: "Можно ли использовать PLAUD для записи интервью?",
    answer: "Да, это один из главных сценариев. Есть готовый шаблон «Interview Questions» — автоматически вытаскивает вопросы и ответы в структурированном виде.",
  },
];
