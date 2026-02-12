import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';

// Импорт логотипов
import logoNfii from '@/assets/partners/nfii.jpg';
import logoOpora from '@/assets/partners/opora-rossii.png';
import logoDelovoyKvartal from '@/assets/partners/delovoy-kvartal.png';
import logoKps from '@/assets/partners/kraypotrebsoyuz.png';
import logoHrBazaar from '@/assets/partners/hr-bazaar.png';
import logoBiteh from '@/assets/partners/biteh.png';
import logoZarplata from '@/assets/partners/zarplata.png';
import logoAbn from '@/assets/partners/abn.png';
import logoBit from '@/assets/partners/bit-magazine.png';
import logoNewRetail from '@/assets/partners/new-retail-forum.png';
import logoAiSummit from '@/assets/partners/ai-summit.png';
import logo7nebo from '@/assets/partners/7nebo.png';
import logoAngelyBiznesa from '@/assets/partners/angely-biznesa.png';
import logoDataFusion from '@/assets/partners/data-fusion.png';
import logoPanorama from '@/assets/partners/panorama.png';
import logoSetKi from '@/assets/partners/set-ki.png';

interface Publication {
  id: number;
  source: string;
  title: string;
  url: string;
  type: 'read' | 'watch';
  logo: string | null;
  alt: string;
  ariaLabel: string;
}

const publications: Publication[] = [
  // Максимально разнообразный порядок - чередуем все источники
  { id: 1, source: 'НФИИ', title: 'НейроТендеролог: ИИ для автоматизации тендерного поиска', url: 'https://nfai.ru/tpost/6zm7z4mem1-neirotenderolog-iskusstvennii-intellekt', type: 'read', logo: logoNfii, alt: 'Публикация НФИИ о НейроТендерологе', ariaLabel: 'Открыть статью НФИИ об автоматизации тендерного поиска' },
  { id: 14, source: 'АБН', title: 'Новая реальность: как ИИ повлияет на образование в РФ', url: 'https://abnews.ru/news/2024/8/17/novaya-realnost-kak-ii-povliyaet-na-obrazovanie-v-rf', type: 'read', logo: logoAbn, alt: 'Статья АБН об ИИ в образовании', ariaLabel: 'Открыть статью об ИИ в образовании' },
  { id: 3, source: 'Деловой Квартал', title: 'ИИ — драйвер для бизнеса', url: 'https://read.flypdf.ru/v/b0f78794-edc0-4b7f-8058-82b8055de534#page/62', type: 'read', logo: logoDelovoyKvartal, alt: 'Статья об ИИ как драйвере бизнеса', ariaLabel: 'Открыть статью об ИИ как драйвере бизнеса' },
  { id: 15, source: '7 НЕБО', title: 'Александра Колибри — спикер на фестивале «7 НЕБО»', url: 'https://t.me/festival7nebo/11706', type: 'read', logo: logo7nebo, alt: 'Выступление на фестивале 7 НЕБО', ariaLabel: 'Открыть публикацию о фестивале' },
  { id: 5, source: 'HR Bazaar', title: 'Как ИИ трансформирует HR-подбор в России', url: 'https://hrbazaar.ru/articles/kak-ii-transformiruet-hr-podbor/', type: 'read', logo: logoHrBazaar, alt: 'Статья об ИИ в HR', ariaLabel: 'Открыть статью об ИИ в HR' },
  { id: 16, source: 'Битех24', title: 'ИИ в праве: разбор основных юридических рисков', url: 'https://biteh24.ru/ii-v-prave-razbor-osnovnykh-yuridicheskikh-riskov/', type: 'read', logo: logoBiteh, alt: 'Статья о юридических рисках ИИ', ariaLabel: 'Открыть статью о юридических рисках' },
  { id: 6, source: 'AI Summit', title: 'Участие в AI SUMMIT 2024', url: 'https://aisummit.ru/', type: 'read', logo: logoAiSummit, alt: 'Участие в AI Summit', ariaLabel: 'Открыть информацию об AI Summit' },
  { id: 2, source: 'ОПОРА РОССИИ', title: 'Победитель регионального этапа премии «Бизнес-Успех»', url: 'https://opora.ru/news/regions/predstavitel-krasnoyarskoy-opory-rossii-stala-odnim-iz-pobediteley-regionalnogo-etapa-natsionalnoy-premii-biznes-uspekh/', type: 'read', logo: logoOpora, alt: 'Публикация ОПОРЫ РОССИИ о премии Бизнес-Успех', ariaLabel: 'Открыть публикацию о премии Бизнес-Успех' },
  { id: 8, source: 'Data Fusion', title: 'Участие в конференции по машинному обучению', url: 'https://t.me/AI_Kolibri/305', type: 'read', logo: logoDataFusion, alt: 'Участие в Data Fusion', ariaLabel: 'Открыть публикацию о Data Fusion' },
  { id: 7, source: 'Зарплата.ру', title: 'Как нейросети выручают в работе психолога', url: 'https://www.journal.zarplata.ru/how-neural-networks-help-out-in-the-work-of-a-psychologist/', type: 'read', logo: logoZarplata, alt: 'Статья о нейросетях в психологии', ariaLabel: 'Открыть статью о нейросетях в психологии' },
  { id: 11, source: 'New Retail Forum', title: 'Участие в New Retail Forum', url: 'https://nrf.upgrade.st/', type: 'read', logo: logoNewRetail, alt: 'Участие в New Retail Forum', ariaLabel: 'Открыть информацию о New Retail Forum' },
  { id: 10, source: 'КПС', title: 'Ежегодное заседание Крайпотребсоюза', url: 'https://www.krayps.ru/news/main_news/?ELEMENT_ID=19160', type: 'read', logo: logoKps, alt: 'Участие в заседании КПС', ariaLabel: 'Открыть новость о заседании' },
  { id: 9, source: 'БИТ', title: 'Мнения: с ИИ на «ты»', url: 'https://bit.samag.ru/archive/more/243', type: 'read', logo: logoBit, alt: 'Статья БИТ об ИИ', ariaLabel: 'Открыть статью БИТ' },
];

const publications2: Publication[] = [
  { id: 13, source: 'Ангелы Бизнеса', title: 'Спикерство для фестиваля «Ангелы Бизнеса»', url: 'https://t.me/gorodangel/415', type: 'read', logo: logoAngelyBiznesa, alt: 'Выступление на фестивале Ангелы Бизнеса', ariaLabel: 'Открыть публикацию о фестивале' },
  { id: 18, source: 'Деловой Квартал', title: 'Колибри Александра — Wiki', url: 'https://krasnoyarsk.dk.ru/wiki/kolibri-aleksandra', type: 'read', logo: logoDelovoyKvartal, alt: 'Профиль в Деловом Квартале', ariaLabel: 'Открыть профиль в Деловом Квартале' },
  { id: 4, source: 'YouTube', title: 'ИИ как сотрудник 24/7: реальные кейсы внедрения', url: 'https://www.youtube.com/watch?v=GhdmiJiXYKQ', type: 'watch', logo: logoOpora, alt: 'Видео о кейсах внедрения ИИ', ariaLabel: 'Смотреть выступление об ИИ' },
  { id: 21, source: '7 НЕБО', title: 'Партнёры фестиваля «7 НЕБО»', url: 'https://t.me/festival7nebo/11800', type: 'read', logo: logo7nebo, alt: 'НейроРешения — партнёр фестиваля', ariaLabel: 'Открыть публикацию о партнёрстве' },
  { id: 12, source: 'НФИИ (Telegram)', title: 'ИИ в бизнесе: как внедрить цифрового сотрудника 24/7', url: 'https://t.me/nfai_main/127', type: 'read', logo: logoNfii, alt: 'Публикация НФИИ о цифровом сотруднике', ariaLabel: 'Открыть публикацию НФИИ' },
  { id: 17, source: 'SET.KI', title: 'Как ИИ трансформирует HR-подбор: от цифр к практике', url: 'https://set.ki/post/3XjKrd2', type: 'read', logo: logoSetKi, alt: 'Статья об ИИ в HR', ariaLabel: 'Открыть статью об ИИ в HR' },
  { id: 19, source: 'ОПОРА РОССИИ', title: 'Красноярские предприниматели приняли участие в Альфа-Конфе', url: 'https://opora.ru/news/regions/krasnoyarskie-predprinimateli-prinyali-uchastie-v-alfa-konfe/', type: 'read', logo: logoOpora, alt: 'Публикация об Альфа-Конфе', ariaLabel: 'Открыть публикацию об Альфа-Конфе' },
  { id: 22, source: 'НФИИ', title: 'НейроРешения запускает Telegram-канал', url: 'https://nfai.ru/tpost/dvo82v7601-neiroresheniya-chlen-nfii-zapuskaet-tele', type: 'read', logo: logoNfii, alt: 'Публикация НФИИ о Telegram-канале', ariaLabel: 'Открыть публикацию НФИИ' },
  { id: 20, source: 'Панорама', title: 'От кисти к коду: трансформация роли художника в эпоху нейросетей', url: 'https://panor.ru/articles/ot-kisti-k-kodu-transformatsiya-roli-khudozhnika-v-epokhu-neyrosetey/118181.html#', type: 'read', logo: logoPanorama, alt: 'Статья о трансформации творческих профессий', ariaLabel: 'Открыть статью о трансформации творческих профессий' },
  { id: 23, source: 'Деловой Квартал', title: 'AI-агентство НейроРешения — Wiki', url: 'https://krasnoyarsk.dk.ru/wiki/ai-agentstvo-neyroresheniya', type: 'read', logo: logoDelovoyKvartal, alt: 'Профиль НейроРешения в ДК', ariaLabel: 'Открыть профиль НейроРешения' },
  { id: 24, source: 'Зарплата.ру', title: 'Новые возможности AI для рекрутинга', url: 'https://krasnoyarsk.dk.ru/news/237229366', type: 'read', logo: logoZarplata, alt: 'Новости бизнеса', ariaLabel: 'Открыть новости бизнеса' },
  { id: 25, source: 'Битех24', title: 'Практика внедрения ИИ в компаниях', url: 'https://krasnoyarsk.dk.ru/news/237222687', type: 'read', logo: logoBiteh, alt: 'Публикация о развитии ИИ', ariaLabel: 'Открыть публикацию о развитии ИИ' },
];

const SourceLogo = ({ logo, source, alt }: { logo: string | null; source: string; alt: string }) => {
  if (logo) {
    return (
      <div className="w-10 h-10 rounded-full overflow-hidden bg-background flex-shrink-0 border border-border/30">
        <img 
          src={logo} 
          alt={alt}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }
  
  return (
    <div 
      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-semibold text-sm"
      aria-hidden="true"
    >
      {source.charAt(0)}
    </div>
  );
};

const PublicationCard = ({ source, title, url, type, logo, alt, ariaLabel }: Omit<Publication, 'id'>) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="flex-shrink-0 w-[220px] md:w-[260px] bg-card rounded-2xl shadow-soft p-5 flex flex-col gap-3 
               hover:shadow-card hover:-translate-y-1 transition-all duration-300
               border border-border/50 group/card"
  >
    <div className="flex items-center gap-3">
      <SourceLogo logo={logo} source={source} alt={alt} />
      <span className="text-sm font-medium text-muted-foreground truncate" aria-hidden="true">{source}</span>
    </div>
    <p className="text-sm text-foreground font-medium leading-snug line-clamp-2 flex-grow min-h-[40px]" aria-hidden="true">
      {title}
    </p>
    <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover/card:underline" aria-hidden="true">
      {type === 'watch' ? 'Смотреть' : 'Читать'}
      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
    </div>
  </a>
);

interface MarqueeRowProps {
  items: Publication[];
  direction: 'left' | 'right';
  speed?: number;
}

const MarqueeRow = ({ items, direction, speed = 120 }: MarqueeRowProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Ширина одной карточки + gap (примерно 260px + 16px gap)
  const cardWidthWithGap = 276;

  const handleArrowClick = useCallback((dir: 'left' | 'right') => {
    if (!contentRef.current) return;
    
    // Получаем CSS-анимацию через Web Animations API
    const animations = contentRef.current.getAnimations();
    const anim = animations[0];
    
    if (!anim) return;

    // Отменяем предыдущий таймаут возобновления
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    // Ставим на паузу
    anim.pause();
    setIsPaused(true);

    // Вычисляем общую ширину одного набора карточек
    const totalWidth = contentRef.current.scrollWidth;
    const oneSetWidth = totalWidth / 3; // У нас 3 копии

    // Вычисляем deltaMs - сколько миллисекунд анимации = 1 карточка
    const animDurationMs = speed * 1000;
    const deltaMs = (cardWidthWithGap / oneSetWidth) * animDurationMs;

    // Получаем текущее время анимации
    const currentTime = anim.currentTime as number || 0;

    // Вычисляем новое время (учитываем направление анимации и стрелки)
    let newTime: number;
    if (direction === 'left') {
      // Анимация движется влево (отрицательный translateX)
      // Стрелка влево = назад по времени, стрелка вправо = вперёд
      newTime = dir === 'left' ? currentTime - deltaMs : currentTime + deltaMs;
    } else {
      // Анимация движется вправо (reverse)
      // Стрелка влево = вперёд, стрелка вправо = назад
      newTime = dir === 'left' ? currentTime + deltaMs : currentTime - deltaMs;
    }

    // Зацикливаем время в пределах длительности анимации
    if (newTime < 0) {
      newTime = animDurationMs + newTime;
    } else if (newTime > animDurationMs) {
      newTime = newTime - animDurationMs;
    }

    anim.currentTime = newTime;

    // Возобновляем анимацию через 500мс
    resumeTimeoutRef.current = setTimeout(() => {
      anim.play();
      setIsPaused(false);
    }, 500);
  }, [direction, speed, cardWidthWithGap]);

  const handleMouseEnter = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const animationClass = direction === 'left' ? 'animate-marquee-pub' : 'animate-marquee-pub-reverse';

  return (
    <div 
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Стрелка влево - видна на hover (desktop) и всегда на touch (mobile) */}
      <button
        onClick={() => handleArrowClick('left')}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 
                   w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/95 shadow-lg border border-border/50
                   flex items-center justify-center
                   opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300
                   hover:bg-primary hover:text-primary-foreground hover:border-primary
                   active:scale-95"
        aria-label="Листать влево"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Стрелка вправо */}
      <button
        onClick={() => handleArrowClick('right')}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 
                   w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/95 shadow-lg border border-border/50
                   flex items-center justify-center
                   opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300
                   hover:bg-primary hover:text-primary-foreground hover:border-primary
                   active:scale-95"
        aria-label="Листать вправо"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Градиенты по краям */}
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" aria-hidden="true" />

      {/* Контейнер с overflow hidden */}
      <div className="overflow-hidden py-2">
        {/* Анимируемый контент */}
        <div 
          ref={contentRef}
          className={`flex gap-4 ${animationClass} ${isPaused ? 'paused' : ''}`}
          style={{ 
            animationDuration: `${speed}s`,
            width: 'max-content'
          }}
        >
          {/* 3 копии для бесшовного цикла */}
          {[...items, ...items, ...items].map((pub, index) => (
            <PublicationCard key={`${pub.id}-${index}`} {...pub} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PublicationsMarquee = () => {
  return (
    <section 
      className="py-10 md:py-16 lg:py-20 bg-muted overflow-hidden"
      aria-label="Публикации в СМИ и выступления Александры Моисеевой об ИИ для бизнеса"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="section-title text-center mb-2 md:mb-3">
          Публикации, СМИ <span className="font-semibold">и выступления</span>
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-8 md:mb-12 italic">
          *До 2024 года — под фамилией Колибри
        </p>
      </div>
      
      {/* Две ленты */}
      <div className="space-y-6">
        <MarqueeRow items={publications} direction="left" speed={140} />
        <MarqueeRow items={publications2} direction="right" speed={110} />
      </div>
    </section>
  );
};

export default PublicationsMarquee;
