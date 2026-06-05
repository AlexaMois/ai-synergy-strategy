
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Consent = () => {{
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Согласие на обработку персональных данных | Александра Моисеева</title>
        <meta name="description" content="Согласие на обработку персональных данных для посетителей сайта aleksamois.ru и клиентов, оставляющих заявки через формы." />
        <link rel="canonical" href="https://aleksamois.ru/legal/consent" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <main className="container mx-auto px-4 py-10 md:py-16 lg:py-20 max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Вернуться на главную
        </Link>

        <article className="max-w-none">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-8">Согласие на обработку персональных данных</h1>

          <div className="text-right text-muted-foreground mb-8">
            <p className="font-medium">УТВЕРЖДАЮ</p>
            <p>ИП Моисеева Александра Алексеевна</p>
            <p>г. Красноярск, 03 июня 2026 г.</p>
          </div>

          <div className="text-muted-foreground leading-relaxed space-y-6">

            <section>
              <p className="italic mb-3">Настоящее Согласие является самостоятельным документом в соответствии с требованиями ч. 1 ст. 9 Федерального закона № 152-ФЗ «О персональных данных» (в ред. с 01.09.2025). Включение согласия в текст договора, оферты или пользовательского соглашения не допускается.</p>
              <p className="mb-3">Я, субъект персональных данных, посетивший сайт https://aleksamois.ru и/или обратившийся к ИП Моисеевой Александре Алексеевне через формы на сайте, по электронной почте, в мессенджерах (Telegram, Max) или по телефону, свободно, своей волей и в своём интересе, в соответствии с требованиями Федерального закона № 152-ФЗ, даю согласие:</p>
              <p><strong>Оператор:</strong> Индивидуальный предприниматель Моисеева Александра Алексеевна, ИНН 245906802500, ОГРНИП 323246800027635, ai@aleksamois.ru.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">1. Перечень персональных данных</h2>
              <p className="mb-3">На обработку которых даётся настоящее Согласие:</p>
              <ul className="list-none space-y-2 mb-3">
                <li>— фамилия, имя, отчество;</li>
                <li>— контактный телефон;</li>
                <li>— адрес электронной почты;</li>
                <li>— наименование организации, должность, ИНН (при обращении от юридического лица или ИП);</li>
                <li>— содержание сообщений и запросов, направленных Оператору;</li>
                <li>— данные, автоматически собираемые при посещении Сайта: IP-адрес, тип браузера, страницы Сайта, время посещения (через cookies — при наличии отдельного согласия на cookies).</li>
              </ul>
              <p>Специальные категории данных (здоровье, национальность, религиозные убеждения, биометрия) Оператором не запрашиваются и не обрабатываются.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">2. Цели обработки</h2>
              <ul className="list-none space-y-2">
                <li>— <strong>ответ на обращение</strong> — обработка заявок, вопросов, запросов через сайт и мессенджеры;</li>
                <li>— <strong>консультирование</strong> — оказание консультационных и иных услуг;</li>
                <li>— <strong>заключение и исполнение договора</strong> — подготовка, заключение, исполнение договоров оказания услуг;</li>
                <li>— <strong>информирование</strong> — уведомления об услугах, программах, актуальных предложениях;</li>
                <li>— <strong>аналитика</strong> — улучшение качества услуг, анализ обращений.</li>
              </ul>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">3. Действия с персональными данными</h2>
              <p>Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача третьим лицам (в рамках исполнения обязательств и при наличии договора поручения), обезличивание, блокирование, удаление, уничтожение.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">4. Способы обработки</h2>
              <p>Автоматизированная обработка (с использованием программных средств) и без использования средств автоматизации.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">5. Передача данных третьим лицам</h2>
              <p className="mb-3">Персональные данные могут передаваться третьим лицам исключительно в целях исполнения обязательств перед субъектом ПДн (подрядчики, сервисы хранения документов на серверах РФ) при наличии договора поручения обработки ПДн.</p>
              <p className="mb-3">Трансграничная передача данных (в том числе через сервисы Google LLC, США) осуществляется только с отдельного согласия субъекта на передачу данных за рубеж (отмечается ниже) и при условии уведомления Роскомнадзора.</p>
              <p className="mb-2">☐ Я даю согласие на трансграничную передачу моих персональных данных на серверы Google LLC (США) в целях аналитики посещаемости Сайта (Google Analytics, Google Tag Manager). Я уведомлён(а), что данные будут обрабатываться на серверах за пределами РФ.</p>
              <p>☐ Я не даю согласие на трансграничную передачу. Мои данные обрабатываются только на серверах в РФ.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">6. Сроки обработки и хранения</h2>
              <ul className="list-none space-y-2 mb-3">
                <li>— обращения, не переросшие в договор — 1 год с момента последнего контакта;</li>
                <li>— данные клиентов по исполненным договорам — 3 года с момента исполнения;</li>
                <li>— первичные учётные документы — 5 лет (ст. 29 Федерального закона № 402-ФЗ).</li>
              </ul>
              <p>По истечении срока — уничтожение в течение 30 дней.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">7. Отзыв согласия</h2>
              <p className="mb-3">Настоящее Согласие может быть отозвано в любое время путём направления письменного запроса на адрес: ai@aleksamois.ru.</p>
              <p className="mb-3">После получения запроса об отзыве:</p>
              <ul className="list-none space-y-2 mb-3">
                <li>— обработка данных прекращается в течение 5 рабочих дней;</li>
                <li>— данные уничтожаются в течение 30 дней, за исключением данных, обрабатываемых на иных законных основаниях (исполнение закона, договора).</li>
              </ul>
              <p>Отзыв согласия не влияет на законность обработки до момента его отзыва.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">8. Права субъекта персональных данных</h2>
              <p className="mb-3">Вы вправе:</p>
              <ul className="list-none space-y-2">
                <li>— получить подтверждение факта обработки и копию своих ПДн;</li>
                <li>— потребовать уточнения, блокировки или уничтожения ПДн;</li>
                <li>— обратиться в Роскомнадзор (rkn.gov.ru) или суд.</li>
              </ul>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">9. Способ выражения согласия</h2>
              <p className="mb-3">Настоящее Согласие выражается одним из следующих способов:</p>
              <ul className="list-none space-y-2 mb-3">
                <li>— проставление отметки (чекбокса) в форме на сайте https://aleksamois.ru рядом с текстом «Я даю согласие на обработку персональных данных» со ссылкой на настоящее Согласие;</li>
                <li>— подписание настоящего документа в бумажной или электронной форме (УКЭП или обмен сканами по email/мессенджеру Max).</li>
              </ul>
              <p>Дата и время согласия фиксируются автоматически в момент отправки формы или подписания документа.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">10. Контактные данные Оператора</h2>
              <p>ИП Моисеева Александра Алексеевна</p>
              <p>Email: ai@aleksamois.ru</p>
              <p>Телефон: +7 995 078 88 37</p>
              <p>Сайт: https://aleksamois.ru/legal/consent/</p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Consent;
