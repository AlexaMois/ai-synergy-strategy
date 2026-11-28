import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import PublicationsMarquee from "@/components/PublicationsMarquee";
import PageTransition from "@/components/PageTransition";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Helmet } from "react-helmet-async";
import { getBreadcrumbs } from "@/utils/breadcrumbSchema";
import PillButton from "@/components/PillButton";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import alexandraAbout from "@/assets/alexandra-about.webp";
import diplomaImage from "@/assets/credentials/diploma-ai-2025.jpg";
import kaeoImage from "@/assets/credentials/certificate-kaeo-level5.png";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import awardDiploma from "@/assets/about/award-diploma.jpg";
import speakingPodium from "@/assets/about/speaking-podium.jpg";
import awardCeremony from "@/assets/about/award-ceremony.jpg";
import businessAngels from "@/assets/about/business-angels.jpg";
import presentingAudience from "@/assets/about/presenting-audience.jpg";
import consultingMeeting from "@/assets/about/consulting-meeting.jpg";
import exhibitionBooth from "@/assets/about/exhibition-booth.jpg";
import speakingCasual from "@/assets/about/speaking-casual.jpg";
import portraitFormal from "@/assets/about/portrait-formal-new.jpg";
import coPresenting1 from "@/assets/about/co-presenting-1.jpg";
import coPresenting2 from "@/assets/about/co-presenting-2.jpg";
import lectureTools from "@/assets/about/lecture-tools.jpg";
import PhotoLightbox from "@/components/PhotoLightbox";
const About=()=>{
const [lightboxOpen,setLightboxOpen]=useState(false);
const [lightboxIndex,setLightboxIndex]=useState(0);
const [selectedCredential,setSelectedCredential]=useState<null|{image:string;title:string;subtitle:string;details:string;year:string}>(null);
const diplomaCredentials = [
    {
      image: diplomaImage,
      title: 'Диплом о профессиональной переподготовке',
      subtitle: 'Специалист по искусственному интеллекту',
      details: 'Международный Университет Цифровой Экономики и Технологий',
      year: '2025',
    },
    {
      image: kaeoImage,
      title: 'Квалификационный сертификат KAEO',
      subtitle: 'Уровень 5 — максимальный',
      details: 'Постановка целей на этапе обучения нейронных сетей',
      year: '2025',
    },
  ];

const allCredentials=[...diplomaCredentials,{image:awardDiploma,title:"Диплом победителя регионального этапа премии «Бизнес-Успех»",subtitle:"Премия «Бизнес-Успех»",details:"Региональный этап",year:"2025"}];
const galleryImages=[{src:speakingPodium,alt:"Выступление на форуме"},{src:presentingAudience,alt:"Выступление перед аудиторией"},{src:consultingMeeting,alt:"Консультация"},{src:exhibitionBooth,alt:"Выставка МЧС"},{src:businessAngels,alt:"Ангелы бизнеса"},{src:speakingCasual,alt:"Выступление на мероприятии"},{src:coPresenting2,alt:"Совместное выступление"},{src:lectureTools,alt:"Лекция об инструментах ИИ"},{src:coPresenting1,alt:"Совместное выступление"}];
const location=useLocation();
useEffect(()=>{if(location.hash){const t=window.setTimeout(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView({block:"start"}),100);return ()=>window.clearTimeout(t);}},[location.hash]);
const galleryButton=(image:{src:string;alt:string},index:number)=><button type="button" key={index} data-bt-gallery-trigger aria-label={image.alt} onClick={()=>{setLightboxIndex(index);setLightboxOpen(true);}}><img src={image.src} alt={image.alt} loading="lazy"/><span>{image.alt}</span></button>;
return <PageTransition><Helmet>
        <title>Александра Моисеева: инженер цифрового развития бизнеса</title>
        <meta name="description" content="Александра Моисеева, основатель компании «НейроРешения», Красноярск. Проектирование и внедрение цифровых систем, автоматизация бизнеса и ИИ-агенты." />
        <meta name="keywords" content="Александра Моисеева, НейроРешения, инженер-архитектор, автоматизация бизнеса, ИИ-агенты, Красноярск" />
        <link rel="canonical" href="https://aleksamois.ru/about/" />
        <meta property="og:title" content="Александра Моисеева: инженер цифрового развития бизнеса" />
        <meta property="og:description" content="Александра Моисеева, основатель компании «НейроРешения», Красноярск. Проектирование и внедрение цифровых систем, автоматизация бизнеса и ИИ-агенты." />
        <meta property="og:url" content="https://aleksamois.ru/about" />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://aleksamois.ru/og-aleksa-2026-v1.png" />
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbs.about())}
        </script>
      </Helmet><style>{"\n.ae-page{max-width:1240px;margin:auto;padding:0 32px;color:#212121;background:#fff;line-height:1.6}.ae-page :is(h1,h2,h3,p,figure){margin:0}.ae-page h1{margin-bottom:18px}.ae-page h2{margin-bottom:12px}.ae-page p+p{margin-top:12px}.ae-page img{display:block;width:100%;height:auto;object-fit:cover}.ae-page .ae-kicker{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px;color:#555}.ae-hero{display:grid;grid-template-columns:1.13fr .87fr;gap:24px;align-items:center;min-height:450px}.ae-copy{padding:34px 0;min-width:0}.ae-role{font-size:23px;line-height:1.35;font-weight:600;margin-bottom:20px!important}.ae-lead{font-size:17px;max-width:570px;color:#444}.ae-actions{display:flex;align-items:center;flex-wrap:wrap;gap:16px 22px;margin-top:24px}.ae-link{text-decoration:underline;text-underline-offset:5px;font-weight:600}.ae-portrait{min-width:0;align-self:stretch;display:flex;align-items:flex-end;justify-content:center;overflow:hidden;background:radial-gradient(ellipse at 50% 65%,#d5d5d5,#f6f6f6 56%,#fff 75%)}.ae-portrait img{max-height:500px;object-fit:contain;object-position:bottom}.ae-metrics{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:18px;padding:26px 0 34px;border-block:1px solid #d6d6d6}.ae-metric{border-right:1px solid #d6d6d6;padding-right:12px}.ae-metric:last-child{border:0}.ae-num{display:block;font:italic 400 clamp(38px,5vw,64px)/1.15 Georgia,serif;letter-spacing:-.05em;color:#333}.ae-metric small{display:block;margin-top:9px;font-size:14px;color:#444}.ae-section{padding-block:68px}.ae-two{display:grid;grid-template-columns:1fr 1.12fr;gap:40px;align-items:start}.ae-two>*{min-width:0}.ae-intro{margin-bottom:32px;align-items:end}.ae-quote{padding:42px 0;border-bottom:1px solid #d6d6d6;grid-template-columns:1fr 2fr}.ae-quote blockquote{font:italic 400 clamp(24px,3vw,38px)/1.3 Georgia,serif;margin:0}.ae-journey img{aspect-ratio:4/5;border-radius:6px}.ae-page figcaption{font-size:13px;color:#555;margin-top:10px}.ae-entry{display:grid;grid-template-columns:58px 1fr;gap:14px;padding:19px 0;border-top:1px solid #d6d6d6}.ae-entry .ae-num{font-size:29px}.ae-entry h3{margin-bottom:8px}.ae-entry p{font-size:15px}.ae-dark{background-color:#212121;background-image:linear-gradient(135deg,#383838,#212121 35%,#101010 70%,#333);color:#fff;border-radius:26px;padding:42px 44px}.ae-page .ae-dark :is(h2,h3,p,summary,a:not(.bt-cta-primary)){color:#fff!important}.ae-page .ae-dark .ae-kicker,.ae-dark .ae-num{color:#3DDCE8!important}.ae-method-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 38px}.ae-method-item{display:grid;grid-template-columns:48px 1fr;gap:14px;padding:21px 0;border-top:1px solid #777}.ae-method-item .ae-num{font-size:35px}.ae-method-item h3{margin-bottom:8px}.ae-method-item p{font-size:15px}.ae-page details{border-top:1px solid #777;padding-top:15px}.ae-page summary{font-weight:600;cursor:pointer}.ae-page details p{margin-top:12px}.ae-steel{background-color:#d9d9d9;background-image:linear-gradient(115deg,#e9e9e9,#f9f9f9 30%,#d6d6d6 66%,#f3f3f3);padding:34px 42px;border-radius:22px;color:#212121}.ae-award{padding:22px}.ae-award img{aspect-ratio:16/10;border-radius:6px}.ae-award h3{margin:17px 0 7px}.ae-list>div{padding:13px 0;border-bottom:1px solid #d6d6d6;font-size:15px}.ae-list strong{display:block}.ae-docs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:22px}.ae-page .ae-doc{min-width:0;border:1px solid #d4d4d4;padding:10px;background:#fff!important;background-image:none!important;color:#212121!important;text-align:left;border-radius:8px;overflow-wrap:anywhere}.ae-doc img{height:140px;object-fit:contain;background:#f6f6f6}.ae-doc span{display:block;font-size:13px;line-height:1.3;margin-top:8px;color:#212121}.ae-gallery{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px}.ae-gallery button{position:relative;overflow:hidden;border-radius:5px;min-width:0;background:#eee}.ae-gallery img{aspect-ratio:4/3;object-fit:cover}.ae-featured button:first-child{grid-column:span 2;grid-row:span 2}.ae-featured button:first-child img{height:100%}.ae-gallery button span{position:absolute;bottom:0;left:0;right:0;padding:7px;background:#212121;color:#fff;font-size:12px;text-align:left}.ae-more{margin-top:18px}.ae-more .ae-gallery{margin-top:15px}.ae-company ul{margin:0;padding:0;list-style:none}.ae-company li a{display:block;padding:12px 0;border-bottom:1px solid #aaa;font-weight:600}.ae-personal{padding:36px 0;border-bottom:1px solid #d6d6d6}.ae-page :is(button,summary,a):focus-visible{outline:3px solid #007a85;outline-offset:3px}\n@media(max-width:920px){.ae-page{padding-inline:22px}.ae-section{padding-block:46px}.ae-two{gap:28px}.ae-hero{min-height:0}.ae-copy{padding:24px 0}.ae-role{font-size:20px}.ae-gallery{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:640px){.ae-page{padding-inline:16px}.ae-hero,.ae-two{grid-template-columns:minmax(0,1fr);gap:20px}.ae-copy{padding:12px 0 0}.ae-role{font-size:18px}.ae-lead{font-size:16px}.ae-portrait img{max-height:340px}.ae-metrics{grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.ae-metric:nth-child(2n){border:0}.ae-metric:last-child{grid-column:span 2}.ae-num{font-size:40px}.ae-section{padding-block:35px}.ae-quote{padding:25px 0}.ae-quote blockquote{font-size:25px}.ae-journey img{aspect-ratio:5/4}.ae-entry{grid-template-columns:40px 1fr;gap:9px}.ae-dark,.ae-steel{padding:25px 19px;border-radius:18px}.ae-method-grid{grid-template-columns:1fr}.ae-method-item{grid-template-columns:38px 1fr;gap:10px}.ae-docs,.ae-gallery{grid-template-columns:repeat(2,minmax(0,1fr))}.ae-doc img{height:110px}.ae-featured button:first-child{grid-row:span 1}.ae-actions{gap:12px}}"}</style><div className="min-h-screen bg-background"><PageBreadcrumbs currentPage="Обо мне"/><main><div className="ae-page">
<section className="ae-hero"><div className="ae-copy"><p className="ae-kicker">Основатель компании «НейроРешения»</p><h1>Александра Моисеева</h1><p className="ae-role">Независимый инженер и архитектор цифрового развития бизнеса</p><p className="ae-lead">Проектирую и внедряю цифровые системы, которые сокращают потери, повышают производительность команды и возвращают собственнику контроль над бизнесом.</p><div className="ae-actions"><PillButton to="/start" variant="dark">Подобрать формат работы</PillButton><Link to="/services" className="ae-link bt-cta-text">Посмотреть решения ↗</Link></div></div><div className="ae-portrait"><img src={alexandraAbout} alt="Александра Моисеева" width={900} height={900} loading="eager" fetchPriority="high"/></div></section>
<section className="ae-metrics" aria-label="Опыт в цифрах">{[["4+","года практики в ИИ"],["40","внедрённых проектов"],["360","разборов бизнес-процессов"],["10","отраслей"],["7","городов, очно и дистанционно"]].map(([n,label])=><div className="ae-metric" key={label}><span className="ae-num">{n}</span><small>{label}</small></div>)}</section>
<section className="ae-two ae-quote"><p className="ae-kicker">Моя главная задача</p><blockquote>«Выстроить систему, в которой собственник видит реальное состояние бизнеса, сотрудники понимают свою ответственность, а данные, сроки и результаты находятся под контролем».</blockquote></section>
<section className="ae-section"><div className="ae-two ae-intro"><div><p className="ae-kicker">Профессиональный путь</p><h2>Опыт, который <em>сформировал подход</em></h2></div><p>Я работаю на стыке управления, процессов, данных и цифровых инструментов. Для меня важны смысл, экономика, люди и результат.</p></div><div className="ae-two ae-journey"><figure><img src={portraitFormal} alt="Профессиональный портрет Александры" loading="lazy"/><figcaption>Александра Моисеева. Инженер и архитектор цифрового развития.</figcaption></figure><div>{[{num: "01",
                  title: "Когда честность важнее должности",
                  body: [
                    "В 27 лет я возглавила кредитный кооператив, где 60 пайщиков потеряли деньги из-за решений прошлого руководства. Мне пришлось выйти к людям, честно объяснить ситуацию и выстроить план возврата средств.",
                    "Мы вернули доверие и большую часть вложений. Этот опыт сформировал мой стиль: взрослость, прямота, уважение к людям и к их деньгам.",
                  ],
                },
                {
                  num: "02",
                  title: "Почему я ушла из банков: выбор ответственности",
                  body: [
                    "После кризисного управления я поняла: мне важна честность процессов и возможность влиять на результат. Я выбираю работу, где можно отвечать за решение, видеть последствия и менять систему, а не просто выполнять указания сверху.",
                  ],
                },
                {
                  num: "03",
                  title: "От первых экспериментов с ИИ к инженерии цифрового развития",
                  body: [
                    "Весной 2023 года я начала работать с ChatGPT-3.5. Сначала это были первые фразы и эксперименты, затем — разбор механики, архитектуры, данных и сценариев применения в бизнесе.",
                    "Я увидела в ИИ новый слой работы с информацией, процессами и управленческими решениями. Так я перешла в инженерный подход к цифровому развитию.",
                  ],
                },
                {
                  num: "04",
                  title: "Вывод: зрелость важнее скорости",
                  body: [
                    "За два года я несколько раз пересобирала архитектуры проектов и команды. Это был тяжёлый, но важный опыт.",
                    "В 2026 году я выбрала компактный формат работы: я, помощница и партнёры под конкретные задачи. Такой формат даёт больше качества, ответственности и фокуса на результате.",
                  ],
                },
              ].map(item=><article key={item.num} className="ae-entry"><span className="ae-num">{item.num}</span><div><h3>{item.title}</h3>{item.body.map(p=><p key={p}>{p}</p>)}</div></article>)}</div></div></section>
<section className="ae-dark" id="methodology"><div className="ae-two ae-intro"><div><p className="ae-kicker">Мой метод</p><h2>Сначала архитектура, <em>затем технологии</em></h2></div><p>Цифровой инструмент даёт результат, когда совпадают бизнес-задача, технологии, процессы и люди.</p></div><div className="ae-method-grid">{[["Экономика","Считаю стоимость ручной работы, ошибок и задержек. Фиксирую цель, метрики и приемлемый срок окупаемости."],["Процессы","Проверяю данные, повторяемость операций, роли, статусы и контрольные точки. Выстраиваю рабочую логику до внедрения."],["Технологии","Подбираю архитектуру под задачу, требования безопасности, интеграции, бюджет и доступ к данным."],["Люди","Оцениваю готовность команды, участие руководителя и распределение ответственности. Закрепляю новый порядок работы."]].map(([title,body],i)=><article className="ae-method-item" key={title}><span className="ae-num">0{i+1}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div><details><summary>Как оцениваю готовность бизнеса и риски</summary><p>Проверяю объём и повторяемость задач, стоимость ошибки, готовность данных и команды, срок окупаемости. Определяю, почему задача важна сейчас и как компания проверит результат.</p><p>Обычно работа занимает 4–8 недель. Срок зависит от процесса, команды, данных и масштаба внедрения; согласуется до старта.</p></details></section>
<section className="ae-section"><div className="ae-two ae-intro"><div><p className="ae-kicker">Регалии и опыт</p><h2>Профессиональная <em>репутация</em></h2></div><p>Практический опыт, профильное образование и участие в профессиональном сообществе.</p></div><div className="ae-two"><div><div className="ae-steel ae-award"><img src={awardCeremony} alt="Церемония награждения премии «Бизнес-Успех» 2025" loading="lazy"/><h3>Премия «Бизнес-Успех» 2025</h3><p>Победитель регионального этапа национальной предпринимательской премии.</p></div><div className="ae-docs">{allCredentials.map(credential=><button type="button" className="bt-credential ae-doc" key={credential.title} onClick={()=>setSelectedCredential(credential)}><img src={credential.image} alt={credential.title} loading="lazy"/><span>{credential.title}</span></button>)}</div></div><div className="ae-list">{[["Дипломированный специалист по искусственному интеллекту","Квалификация KAEO, уровень 5"],["Резидент КРИТБИ","Красноярский региональный технологический бизнес-инкубатор"],["Резидент IT Park Казань",""],["Член ОПОРА России",""],["Участник NeuroTech Russia",""],["Спикер профильных мероприятий","Цифровизация и ИИ, выставка «Антитеррор»"],["Профильные программы","ИИ, стратегия, трансформация и авторская позиция"]].map(([title,desc])=><div key={title}><strong>{title}</strong>{desc}</div>)}</div></div></section>
<section className="ae-section" style={{paddingTop:5}}><div className="ae-two ae-intro"><div><p className="ae-kicker">Публичная деятельность</p><h2>Выступления <em>и форумы</em></h2></div><p>Делюсь практикой внедрения ИИ в малом и среднем бизнесе.</p></div><div className="ae-gallery ae-featured">{galleryImages.slice(0,5).map(galleryButton)}</div><details className="ae-more"><summary>Все фотографии из профессиональной практики</summary><div className="ae-gallery">{galleryImages.slice(5).map((im,i)=>galleryButton(im,i+5))}</div></details></section></div>
<PublicationsMarquee/>
<div className="ae-page"><section id="company-directions" className="ae-steel ae-two ae-company"><div><p className="ae-kicker">Технологическая компания</p><h2>Основатель «НейроРешений»</h2><p>Компания выросла из моей практики внедрения ИИ, автоматизации и управленческих инструментов. Сокращаем ручную работу, связываем данные и системы, проверяем результат на согласованных показателях.</p></div><ul>{[["Продукты: НейроТендеролог и корпоративный портал знаний","/products"],["ИИ-агенты для бизнеса: готовые решения, Hermes и индивидуальная разработка","/ai-agents"],["Комплексная автоматизация","/services/automation"],["Экспертная работа: бесплатная проверка, выездная консультация, аудит, обучение и ДПО","/expert"]].map(([label,href])=><li key={href}><Link to={href}>{label} ↗</Link></li>)}</ul></section>
<section className="ae-two ae-personal"><div><p className="ae-kicker">Личное</p><h2>Энергия и устойчивость</h2></div><p>Проекты по цифровому развитию требуют глубокого внимания, выдержки и ясной головы. Йога, медитация и регулярное восстановление сохраняют фокус и помогают видеть задачу целиком.</p></section>
<section className="ae-section"><div className="ae-dark ae-two"><div><p className="ae-kicker">Следующий шаг</p><h2>Начните с понятного формата работы</h2><p>Выберите готовое решение или начните с проверки рабочего процесса.</p></div><div className="ae-actions"><PillButton to="/start" variant="light">Подобрать формат работы</PillButton><a className="ae-link" href="https://t.me/aleksamois" target="_blank" rel="noopener noreferrer">Написать в Telegram ↗</a><Link className="ae-link" to="/services">Посмотреть решения ↗</Link></div></div></section></div>
<Dialog open={!!selectedCredential} onOpenChange={(open) => !open && setSelectedCredential(null)}>
          <DialogContent aria-describedby={undefined} className="bt-global-ui bt-dialog-surface bt-credential-dialog max-w-4xl p-0 overflow-hidden bg-background border-border">
            <DialogTitle className="sr-only">
              {selectedCredential?.title}
            </DialogTitle>
            {selectedCredential && (
              <div className="relative">
                <img
                  src={selectedCredential.image}
                  alt={selectedCredential.title}
                  className="bt-credential-full w-full h-auto max-h-[85vh] object-contain"
                />
                <div className="bt-credential-caption p-4 md:p-6">
                  <h3 className="font-semibold text-foreground text-base md:text-lg">
                    {selectedCredential.title}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {selectedCredential.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedCredential.details} • {selectedCredential.year}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>        <PhotoLightbox images={galleryImages} currentIndex={lightboxIndex} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} onNavigate={setLightboxIndex} /><Partners/></main><Footer/></div></PageTransition>;
};
export default About;
