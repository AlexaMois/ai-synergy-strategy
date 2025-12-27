import { ExternalLink, MessageCircle, Youtube, Newspaper, FileText, Award, BookOpen } from 'lucide-react';

interface Publication {
  id: number;
  source: string;
  title: string;
  url: string;
  type: 'read' | 'watch';
  icon: 'telegram' | 'youtube' | 'news' | 'article' | 'award' | 'book';
}

const publications: Publication[] = [
  {
    id: 1,
    source: 'НФИИ (Telegram)',
    title: 'ИИ в бизнесе: как внедрить цифрового сотрудника 24/7',
    url: 'https://t.me/nfai_main/127',
    type: 'read',
    icon: 'telegram'
  },
  {
    id: 2,
    source: 'НФИИ',
    title: 'НейроРешения запускает Telegram-канал, который заменит штатного тендерщика',
    url: 'https://nfai.ru/tpost/dvo82v7601-neiroresheniya-chlen-nfii-zapuskaet-tele',
    type: 'read',
    icon: 'news'
  },
  {
    id: 3,
    source: 'НФИИ',
    title: 'НейроТендеролог: ИИ для автоматизации тендерного поиска',
    url: 'https://nfai.ru/tpost/6zm7z4mem1-neirotenderolog-iskusstvennii-intellekt',
    type: 'read',
    icon: 'article'
  },
  {
    id: 4,
    source: 'YouTube',
    title: 'ИИ как сотрудник 24/7: реальные кейсы внедрения | ОПОРА РОССИИ',
    url: 'https://www.youtube.com/watch?v=GhdmiJiXYKQ',
    type: 'watch',
    icon: 'youtube'
  },
  {
    id: 5,
    source: 'ОПОРА РОССИИ',
    title: 'Победитель регионального этапа премии «Бизнес-Успех»',
    url: 'https://opora.ru/news/regions/predstavitel-krasnoyarskoy-opory-rossii-stala-odnim-iz-pobediteley-regionalnogo-etapa-natsionalnoy-premii-biznes-uspekh/',
    type: 'read',
    icon: 'award'
  },
  {
    id: 6,
    source: 'ОПОРА РОССИИ',
    title: 'Красноярские предприниматели приняли участие в Альфа-Конфе',
    url: 'https://opora.ru/news/regions/krasnoyarskie-predprinimateli-prinyali-uchastie-v-alfa-konfe/',
    type: 'read',
    icon: 'news'
  },
  {
    id: 7,
    source: 'Деловой Квартал',
    title: 'ИИ — драйвер для бизнеса',
    url: 'https://read.flypdf.ru/v/b0f78794-edc0-4b7f-8058-82b8055de534#page/62',
    type: 'read',
    icon: 'book'
  },
  {
    id: 8,
    source: 'HR Bazaar',
    title: 'Как ИИ трансформирует HR-подбор в России',
    url: 'https://hrbazaar.ru/articles/kak-ii-transformiruet-hr-podbor/',
    type: 'read',
    icon: 'article'
  },
  {
    id: 9,
    source: 'SET.KI',
    title: 'Как ИИ трансформирует HR-подбор: от цифр к практике',
    url: 'https://set.ki/post/3XjKrd2',
    type: 'read',
    icon: 'article'
  },
  {
    id: 10,
    source: 'Деловой Квартал',
    title: 'Колибри Александра — Wiki',
    url: 'https://krasnoyarsk.dk.ru/wiki/kolibri-aleksandra',
    type: 'read',
    icon: 'news'
  },
  {
    id: 11,
    source: 'Деловой Квартал',
    title: 'AI-агентство НейроРешения — Wiki',
    url: 'https://krasnoyarsk.dk.ru/wiki/ai-agentstvo-neyroresheniya',
    type: 'read',
    icon: 'news'
  },
  {
    id: 12,
    source: 'Битех24',
    title: 'ИИ в праве: разбор основных юридических рисков',
    url: 'https://biteh24.ru/ii-v-prave-razbor-osnovnykh-yuridicheskikh-riskov/',
    type: 'read',
    icon: 'article'
  },
  {
    id: 13,
    source: 'Панорама',
    title: 'От кисти к коду: трансформация роли художника в эпоху нейросетей',
    url: 'https://panor.ru/articles/ot-kisti-k-kodu-transformatsiya-roli-khudozhnika-v-epokhu-neyrosetey/118181.html#',
    type: 'read',
    icon: 'book'
  },
  {
    id: 14,
    source: 'КПС',
    title: 'Ежегодное заседание Крайпотребсоюза',
    url: 'https://www.krayps.ru/news/main_news/?ELEMENT_ID=19160',
    type: 'read',
    icon: 'news'
  },
  {
    id: 15,
    source: 'Деловой Квартал',
    title: 'Новости бизнеса Красноярска',
    url: 'https://krasnoyarsk.dk.ru/news/237229366',
    type: 'read',
    icon: 'news'
  },
  {
    id: 16,
    source: 'Деловой Квартал',
    title: 'Публикация о развитии ИИ в регионе',
    url: 'https://krasnoyarsk.dk.ru/news/237222687',
    type: 'read',
    icon: 'news'
  },
  {
    id: 17,
    source: 'Воркшоп',
    title: 'Воркшоп по нейросетям',
    url: '#',
    type: 'read',
    icon: 'article'
  }
];

const getIcon = (iconType: Publication['icon']) => {
  const iconClass = "w-5 h-5 text-primary";
  switch (iconType) {
    case 'telegram':
      return <MessageCircle className={iconClass} />;
    case 'youtube':
      return <Youtube className={iconClass} />;
    case 'news':
      return <Newspaper className={iconClass} />;
    case 'award':
      return <Award className={iconClass} />;
    case 'book':
      return <BookOpen className={iconClass} />;
    default:
      return <FileText className={iconClass} />;
  }
};

const PublicationCard = ({ source, title, url, type, icon }: Omit<Publication, 'id'>) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-shrink-0 w-[200px] bg-card rounded-xl shadow-soft p-4 flex flex-col gap-3 
               hover:shadow-card hover:-translate-y-1 transition-all duration-300
               border border-border/50 group"
  >
    <div className="flex items-center gap-2">
      {getIcon(icon)}
      <span className="text-xs font-medium text-muted-foreground truncate">{source}</span>
    </div>
    <p className="text-sm text-foreground font-medium leading-tight line-clamp-2 flex-grow">
      {title}
    </p>
    <div className="flex items-center gap-1 text-primary text-xs font-medium group-hover:underline">
      {type === 'watch' ? 'Смотреть' : 'Читать'}
      <ExternalLink className="w-3 h-3" />
    </div>
  </a>
);

const PublicationsMarquee = () => {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-muted overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="section-title text-center mb-8">
          Публикации, СМИ <span className="font-semibold">и выступления</span>
        </h2>
      </div>
      
      {/* Marquee container */}
      <div className="relative group">
        {/* Градиенты по краям */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />
        
        {/* Лента */}
        <div className="flex gap-4 marquee-publications group-hover:pause-animation">
          {/* Дублируем для бесконечной ленты */}
          {[...publications, ...publications, ...publications].map((pub, index) => (
            <PublicationCard key={`${pub.id}-${index}`} {...pub} />
          ))}
        </div>
      </div>
      
      {/* Ссылка на полный список */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mt-8">
          <a 
            href="/publications" 
            className="text-primary hover:underline inline-flex items-center gap-2 text-sm font-medium"
          >
            Полный список публикаций, интервью и выступлений
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PublicationsMarquee;
