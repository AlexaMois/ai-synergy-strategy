import { ExternalLink } from 'lucide-react';
import { useRef, useState } from 'react';

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

// Логотипы для источников без изображения
const defaultLogos: Record<string, string | null> = {
  'НФИИ': logoNfii,
  'НФИИ (Telegram)': logoNfii,
  'ОПОРА РОССИИ': logoOpora,
  'Деловой Квартал': logoDelovoyKvartal,
  'КПС': logoKps,
  'YouTube': null,
  'HR Bazaar': logoHrBazaar,
  'SET.KI': null,
  'Битех24': logoBiteh,
  'Панорама': null,
  'Воркшоп': null,
  'Зарплата.ру': logoZarplata,
  'АБН': logoAbn,
  'БИТ': logoBit,
  'New Retail Forum': logoNewRetail,
  'AI Summit': logoAiSummit,
  '7 НЕБО': logo7nebo,
  'Ангелы Бизнеса': logoAngelyBiznesa,
  'Data Fusion': logoDataFusion,
};

const publications: Publication[] = [
  {
    id: 1,
    source: 'НФИИ (Telegram)',
    title: 'ИИ в бизнесе: как внедрить цифрового сотрудника 24/7',
    url: 'https://t.me/nfai_main/127',
    type: 'read',
    logo: logoNfii,
    alt: 'Публикация НФИИ о цифровом сотруднике 24/7 и внедрении ИИ в бизнес — Александра Моисеева',
    ariaLabel: 'Открыть публикацию НФИИ о внедрении цифрового сотрудника 24/7 в бизнесе'
  },
  {
    id: 2,
    source: 'НФИИ',
    title: 'НейроРешения запускает Telegram-канал, который заменит штатного тендерщика',
    url: 'https://nfai.ru/tpost/dvo82v7601-neiroresheniya-chlen-nfii-zapuskaet-tele',
    type: 'read',
    logo: logoNfii,
    alt: 'Публикация НФИИ о запуске Telegram-канала НейроТендеролог — Александра Моисеева',
    ariaLabel: 'Открыть публикацию НФИИ о запуске Telegram-канала для тендерного поиска'
  },
  {
    id: 3,
    source: 'НФИИ',
    title: 'НейроТендеролог: ИИ для автоматизации тендерного поиска',
    url: 'https://nfai.ru/tpost/6zm7z4mem1-neirotenderolog-iskusstvennii-intellekt',
    type: 'read',
    logo: logoNfii,
    alt: 'Публикация НФИИ о НейроТендерологе — автоматизация тендерного поиска с помощью ИИ',
    ariaLabel: 'Открыть статью НФИИ об автоматизации тендерного поиска с помощью ИИ'
  },
  {
    id: 4,
    source: 'YouTube',
    title: 'ИИ как сотрудник 24/7: реальные кейсы внедрения | ОПОРА РОССИИ',
    url: 'https://www.youtube.com/watch?v=GhdmiJiXYKQ',
    type: 'watch',
    logo: logoOpora,
    alt: 'Видео выступления Александры Моисеевой об ИИ как цифровом сотруднике 24/7',
    ariaLabel: 'Смотреть выступление об ИИ как цифровом сотруднике 24/7'
  },
  {
    id: 5,
    source: 'ОПОРА РОССИИ',
    title: 'Победитель регионального этапа премии «Бизнес-Успех»',
    url: 'https://opora.ru/news/regions/predstavitel-krasnoyarskoy-opory-rossii-stala-odnim-iz-pobediteley-regionalnogo-etapa-natsionalnoy-premii-biznes-uspekh/',
    type: 'read',
    logo: logoOpora,
    alt: 'Публикация ОПОРЫ РОССИИ о победе Александры Моисеевой в премии Бизнес-Успех',
    ariaLabel: 'Открыть публикацию ОПОРЫ РОССИИ о премии Бизнес-Успех'
  },
  {
    id: 6,
    source: 'ОПОРА РОССИИ',
    title: 'Красноярские предприниматели приняли участие в Альфа-Конфе',
    url: 'https://opora.ru/news/regions/krasnoyarskie-predprinimateli-prinyali-uchastie-v-alfa-konfe/',
    type: 'read',
    logo: logoOpora,
    alt: 'Публикация ОПОРЫ РОССИИ об участии предпринимателей в Альфа-Конфе — Александра Моисеева',
    ariaLabel: 'Открыть публикацию ОПОРЫ РОССИИ об Альфа-Конфе'
  },
  {
    id: 7,
    source: 'Деловой Квартал',
    title: 'ИИ — драйвер для бизнеса',
    url: 'https://read.flypdf.ru/v/b0f78794-edc0-4b7f-8058-82b8055de534#page/62',
    type: 'read',
    logo: logoDelovoyKvartal,
    alt: 'Статья Делового Квартала об ИИ как драйвере роста бизнеса — Александра Моисеева',
    ariaLabel: 'Открыть статью Делового Квартала об ИИ как драйвере бизнеса'
  },
  {
    id: 8,
    source: 'HR Bazaar',
    title: 'Как ИИ трансформирует HR-подбор в России',
    url: 'https://hrbazaar.ru/articles/kak-ii-transformiruet-hr-podbor/',
    type: 'read',
    logo: logoHrBazaar,
    alt: 'Экспертная статья об использовании ИИ в HR и подборе персонала — Александра Моисеева',
    ariaLabel: 'Открыть экспертную статью об использовании ИИ в HR'
  },
  {
    id: 9,
    source: 'SET.KI',
    title: 'Как ИИ трансформирует HR-подбор: от цифр к практике',
    url: 'https://set.ki/post/3XjKrd2',
    type: 'read',
    logo: null,
    alt: 'Экспертная статья об использовании ИИ в HR-подборе — Александра Моисеева',
    ariaLabel: 'Открыть экспертную статью об использовании ИИ в HR'
  },
  {
    id: 10,
    source: 'Деловой Квартал',
    title: 'Колибри Александра — Wiki',
    url: 'https://krasnoyarsk.dk.ru/wiki/kolibri-aleksandra',
    type: 'read',
    logo: logoDelovoyKvartal,
    alt: 'Профиль Александры Моисеевой в Деловом Квартале — эксперт по ИИ и цифровой архитектуре',
    ariaLabel: 'Открыть профиль Александры Моисеевой в Деловом Квартале'
  },
  {
    id: 11,
    source: 'Деловой Квартал',
    title: 'AI-агентство НейроРешения — Wiki',
    url: 'https://krasnoyarsk.dk.ru/wiki/ai-agentstvo-neyroresheniya',
    type: 'read',
    logo: logoDelovoyKvartal,
    alt: 'Профиль AI-агентства НейроРешения в Деловом Квартале — ИИ-решения для бизнеса',
    ariaLabel: 'Открыть профиль AI-агентства НейроРешения в Деловом Квартале'
  },
  {
    id: 12,
    source: 'Битех24',
    title: 'ИИ в праве: разбор основных юридических рисков',
    url: 'https://biteh24.ru/ii-v-prave-razbor-osnovnykh-yuridicheskikh-riskov/',
    type: 'read',
    logo: logoBiteh,
    alt: 'Экспертная статья о юридических аспектах применения ИИ — Александра Моисеева',
    ariaLabel: 'Открыть статью о юридических рисках применения ИИ'
  },
  {
    id: 13,
    source: 'Панорама',
    title: 'От кисти к коду: трансформация роли художника в эпоху нейросетей',
    url: 'https://panor.ru/articles/ot-kisti-k-kodu-transformatsiya-roli-khudozhnika-v-epokhu-neyrosetey/118181.html#',
    type: 'read',
    logo: null,
    alt: 'Статья о трансформации творческих профессий в эпоху нейросетей — Александра Моисеева',
    ariaLabel: 'Открыть статью о трансформации творческих профессий в эпоху нейросетей'
  },
  {
    id: 14,
    source: 'КПС',
    title: 'Ежегодное заседание Крайпотребсоюза',
    url: 'https://www.krayps.ru/news/main_news/?ELEMENT_ID=19160',
    type: 'read',
    logo: logoKps,
    alt: 'Участие Александры Моисеевой в ежегодном заседании Крайпотребсоюза',
    ariaLabel: 'Открыть новость о заседании Крайпотребсоюза с участием Александры Моисеевой'
  },
  {
    id: 15,
    source: 'Деловой Квартал',
    title: 'Новости бизнеса Красноярска',
    url: 'https://krasnoyarsk.dk.ru/news/237229366',
    type: 'read',
    logo: logoDelovoyKvartal,
    alt: 'Публикация Делового Квартала о бизнесе Красноярска — Александра Моисеева',
    ariaLabel: 'Открыть новость Делового Квартала о бизнесе Красноярска'
  },
  {
    id: 16,
    source: 'Деловой Квартал',
    title: 'Публикация о развитии ИИ в регионе',
    url: 'https://krasnoyarsk.dk.ru/news/237222687',
    type: 'read',
    logo: logoDelovoyKvartal,
    alt: 'Публикация Делового Квартала о развитии ИИ в регионе — Александра Моисеева',
    ariaLabel: 'Открыть новость о развитии ИИ в регионе'
  },
  {
    id: 17,
    source: 'Воркшоп',
    title: 'Воркшоп по нейросетям',
    url: '#',
    type: 'read',
    logo: null,
    alt: 'Воркшоп по нейросетям с участием Александры Моисеевой',
    ariaLabel: 'Узнать о воркшопе по нейросетям'
  },
  {
    id: 18,
    source: 'Зарплата.ру',
    title: 'Как нейросети выручают в работе психолога',
    url: 'https://www.journal.zarplata.ru/how-neural-networks-help-out-in-the-work-of-a-psychologist/',
    type: 'read',
    logo: logoZarplata,
    alt: 'Статья Зарплата.ру о применении нейросетей в работе психолога — Александра Моисеева',
    ariaLabel: 'Открыть статью о применении нейросетей в работе психолога'
  },
  {
    id: 19,
    source: 'АБН',
    title: 'Новая реальность: как ИИ повлияет на образование в РФ',
    url: 'https://abnews.ru/news/2024/8/17/novaya-realnost-kak-ii-povliyaet-na-obrazovanie-v-rf',
    type: 'read',
    logo: logoAbn,
    alt: 'Статья АБН о влиянии ИИ на образование в России — Александра Моисеева',
    ariaLabel: 'Открыть статью о влиянии ИИ на образование в России'
  },
  {
    id: 20,
    source: 'БИТ',
    title: 'Мнения: с ИИ на «ты»',
    url: 'https://bit.samag.ru/archive/more/243',
    type: 'read',
    logo: logoBit,
    alt: 'Статья БИТ о взаимодействии с искусственным интеллектом — Александра Моисеева',
    ariaLabel: 'Открыть статью БИТ о взаимодействии с ИИ'
  },
  {
    id: 21,
    source: 'New Retail Forum',
    title: 'Участие в New Retail Forum',
    url: 'https://nrf.upgrade.st/',
    type: 'read',
    logo: logoNewRetail,
    alt: 'Участие Александры Моисеевой в New Retail Forum',
    ariaLabel: 'Открыть информацию об участии в New Retail Forum'
  },
  {
    id: 22,
    source: 'AI Summit',
    title: 'Участие в AI SUMMIT 2024',
    url: 'https://aisummit.ru/',
    type: 'read',
    logo: logoAiSummit,
    alt: 'Участие Александры Моисеевой в AI Summit 2024',
    ariaLabel: 'Открыть информацию об участии в AI Summit 2024'
  },
  {
    id: 23,
    source: 'Ангелы Бизнеса',
    title: 'Спикерство для фестиваля «Ангелы Бизнеса»',
    url: 'https://t.me/gorodangel/415',
    type: 'read',
    logo: logoAngelyBiznesa,
    alt: 'Выступление Александры Моисеевой на фестивале Ангелы Бизнеса',
    ariaLabel: 'Открыть публикацию о выступлении на фестивале Ангелы Бизнеса'
  },
  {
    id: 24,
    source: '7 НЕБО',
    title: 'Партнёры фестиваля «7 НЕБО»',
    url: 'https://t.me/festival7nebo/11800',
    type: 'read',
    logo: logo7nebo,
    alt: 'НейроРешения — партнёр фестиваля 7 НЕБО',
    ariaLabel: 'Открыть публикацию о партнёрстве с фестивалем 7 НЕБО'
  },
  {
    id: 25,
    source: '7 НЕБО',
    title: 'Александра Колибри — спикер на фестивале «7 НЕБО»',
    url: 'https://t.me/festival7nebo/11706',
    type: 'read',
    logo: logo7nebo,
    alt: 'Выступление Александры Моисеевой на фестивале 7 НЕБО',
    ariaLabel: 'Открыть публикацию о выступлении на фестивале 7 НЕБО'
  },
  {
    id: 26,
    source: 'Data Fusion',
    title: 'Участие в конференции по машинному обучению Data Fusion',
    url: 'https://t.me/AI_Kolibri/305',
    type: 'read',
    logo: logoDataFusion,
    alt: 'Участие Александры Моисеевой в конференции Data Fusion по машинному обучению',
    ariaLabel: 'Открыть публикацию об участии в конференции Data Fusion'
  }
];

const SourceLogo = ({ logo, source, alt }: { logo: string | null; source: string; alt: string }) => {
  if (logo) {
    return (
      <div className="w-8 h-8 rounded-lg overflow-hidden bg-background flex-shrink-0 border border-border/30">
        <img 
          src={logo} 
          alt={alt}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }
  
  // Fallback: первая буква источника
  return (
    <div 
      className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-semibold text-sm"
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
    className="flex-shrink-0 w-[200px] bg-card rounded-xl shadow-soft p-4 flex flex-col gap-3 
               hover:shadow-card hover:-translate-y-1 transition-all duration-300
               border border-border/50 group"
  >
    <div className="flex items-center gap-2">
      <SourceLogo logo={logo} source={source} alt={alt} />
      <span className="text-xs font-medium text-muted-foreground truncate" aria-hidden="true">{source}</span>
    </div>
    <p className="text-sm text-foreground font-medium leading-tight line-clamp-2 flex-grow" aria-hidden="true">
      {title}
    </p>
    <div className="flex items-center gap-1 text-primary text-xs font-medium group-hover:underline" aria-hidden="true">
      {type === 'watch' ? 'Смотреть' : 'Читать'}
      <ExternalLink className="w-3 h-3" aria-hidden="true" />
    </div>
  </a>
);

// Разделяем публикации на 2 ряда
const firstRow = publications.filter((_, i) => i % 2 === 0);
const secondRow = publications.filter((_, i) => i % 2 === 1);

const PublicationsMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const handleInteractionStart = () => setIsPaused(true);
  const handleInteractionEnd = () => setIsPaused(false);

  return (
    <section 
      className="py-10 md:py-16 lg:py-20 bg-muted overflow-hidden"
      aria-label="Публикации в СМИ и выступления Александры Моисеевой об ИИ для бизнеса"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="section-title text-center mb-8">
          Публикации, СМИ <span className="font-semibold">и выступления</span>
        </h2>
      </div>
      
      {/* Marquee container */}
      <div className="relative space-y-4">
        {/* Градиенты по краям */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" aria-hidden="true" />
        
        {/* Первый ряд — движется влево, можно листать */}
        <div 
          ref={row1Ref}
          className={`flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing touch-pan-x ${
            isPaused ? '' : 'marquee-publications'
          }`}
          onMouseEnter={handleInteractionStart}
          onMouseLeave={handleInteractionEnd}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
        >
          {[...firstRow, ...firstRow, ...firstRow].map((pub, index) => (
            <PublicationCard key={`row1-${pub.id}-${index}`} {...pub} />
          ))}
        </div>
        
        {/* Второй ряд — движется вправо, можно листать */}
        <div 
          ref={row2Ref}
          className={`flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing touch-pan-x ${
            isPaused ? '' : 'marquee-publications-reverse'
          }`}
          onMouseEnter={handleInteractionStart}
          onMouseLeave={handleInteractionEnd}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
        >
          {[...secondRow, ...secondRow, ...secondRow].map((pub, index) => (
            <PublicationCard key={`row2-${pub.id}-${index}`} {...pub} />
          ))}
        </div>
      </div>
      
      {/* Ссылка на полный список */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mt-8">
          <a 
            href="/publications" 
            className="text-primary hover:underline inline-flex items-center gap-2 text-sm font-medium"
            aria-label="Открыть полный список публикаций, интервью и выступлений Александры Моисеевой"
          >
            Полный список публикаций, интервью и выступлений
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PublicationsMarquee;
