
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Политика обработки персональных данных | Александра Моисеева</title>
        <meta name="description" content="Политика обработки персональных данных на сайте aleksamois.ru. Цели, правовые основания, сроки хранения и права субъектов ПДн." />
        <link rel="canonical" href="https://aleksamois.ru/legal/privacy-policy" />
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-8">Политика обработки персональных данных</h1>

          <div className="text-right text-muted-foreground mb-8">
            <p className="font-medium">УТВЕРЖДАЮ</p>
            <p>ИП Моисеева Александра Алексеевна</p>
            <p>г. Красноярск, 03 июня 2026 г.</p>
          </div>

          <div className="text-muted-foreground leading-relaxed space-y-6">

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">1. Общие положения</h2>
              <p className="mb-3"><strong>1.1.</strong> Настоящая Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» (в редакции, действующей с учётом изменений 2025–2026 гг., включая поправки, вступившие в силу с 01.07.2025 и 01.09.2025) и определяет порядок обработки персональных данных, осуществляемой индивидуальным предпринимателем Моисеевой Александрой Алексеевной, ИНН 245906802500, ОГРНИП 323246800027635 (далее — Оператор).</p>
              <p className="mb-3"><strong>1.2.</strong> Политика применяется ко всем персональным данным, которые Оператор получает от субъектов ПДн при использовании сайта https://aleksamois.ru, а также через формы обратной связи, мессенджеры (Telegram, Max), электронную почту и иные каналы.</p>
              <p><strong>1.3.</strong> Оператор зарегистрирован в реестре операторов персональных данных Роскомнадзора.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">2. Термины и определения</h2>
              <ul className="list-none space-y-2">
                <li><strong>Персональные данные (ПДн)</strong> — любая информация, относящаяся к прямо или косвенно определяемому физическому лицу (субъекту ПДн);</li>
                <li><strong>Обработка ПДн</strong> — любые действия с ПДн, включая сбор, запись, систематизацию, хранение, уточнение, использование, передачу, обезличивание, уничтожение;</li>
                <li><strong>Оператор</strong> — ИП Моисеева А.А., организующий обработку ПДн;</li>
                <li><strong>Субъект ПДн</strong> — физическое лицо, к которому относятся персональные данные;</li>
                <li><strong>Трансграничная передача</strong> — передача ПДн на территорию иностранного государства.</li>
              </ul>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">3. Цели обработки персональных данных</h2>
              <ul className="list-none space-y-2">
                <li>— ответ на обращения через формы, email, мессенджеры — согласие субъекта ПДн (ст. 9 152-ФЗ);</li>
                <li>— заключение и исполнение договоров оказания услуг — п. 5 ч. 1 ст. 6 152-ФЗ;</li>
                <li>— выставление счётов, актов, налоговая и бухгалтерская отчётность — п. 2 ч. 1 ст. 6 152-ФЗ;</li>
                <li>— информирование об услугах и продуктах (маркетинг) — согласие субъекта ПДн;</li>
                <li>— аналитика посещаемости Сайта и улучшение качества услуг — согласие субъекта ПДн (cookies).</li>
              </ul>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">4. Перечень обрабатываемых персональных данных</h2>
              <p className="mb-3"><strong>4.1.</strong> Стандартные категории:</p>
              <ul className="list-none space-y-2 mb-4">
                <li>— фамилия, имя, отчество;</li>
                <li>— адрес электронной почты;</li>
                <li>— контактный телефон;</li>
                <li>— наименование организации, должность;</li>
                <li>— ИНН (при заключении договора);</li>
                <li>— содержание переписки в рамках исполнения услуг.</li>
              </ul>
              <p className="mb-3"><strong>4.2. Специальные категории и биометрия</strong> — Оператор не обрабатывает специальные категории ПДн (сведения о здоровье, расовой принадлежности, религиозных убеждениях, судимостях) и биометрические данные.</p>
              <p><strong>4.3. Паспортные данные</strong> — обрабатываются только при необходимости, установленной законодательством (например, при заключении договора с физическим лицом), исключительно на основании письменного согласия и/или договора.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">5. Условия обработки и хранения</h2>
              <p className="mb-3"><strong>5.1.</strong> Оператор осуществляет обработку ПДн как с использованием автоматизированных средств, так и без них.</p>
              <p className="mb-3"><strong>5.2. Локализация:</strong> первичный сбор, запись, систематизация, хранение и обработка ПДн граждан РФ осуществляются на серверах, расположенных на территории РФ (ст. 18 Федерального закона № 152-ФЗ в ред. с 01.07.2025).</p>
              <p className="mb-3"><strong>5.3. Передача третьим лицам</strong> допускается только:</p>
              <ul className="list-none space-y-2 mb-3">
                <li>— в рамках исполнения договорных обязательств (при наличии договора поручения обработки ПДн — ст. 6 152-ФЗ);</li>
                <li>— в случаях, прямо установленных законодательством РФ;</li>
                <li>— с согласия субъекта ПДн.</li>
              </ul>
              <p className="mb-3">Сервисы, задействованные при оказании услуг: Яндекс (серверы РФ), сервисы хранения документов (Яндекс Диск — РФ). При использовании зарубежных сервисов (Google) — только при наличии согласия субъекта на трансграничную передачу и уведомления Роскомнадзора (ст. 12 152-ФЗ).</p>
              <p className="mb-3"><strong>5.4. Сроки хранения:</strong></p>
              <ul className="list-none space-y-2 mb-3">
                <li>— переписка и заявки (не переросшие в договор) — 1 год с момента последнего обращения;</li>
                <li>— данные действующих и бывших клиентов — 3 года с момента исполнения договора;</li>
                <li>— первичная учётная документация (счета, акты, договоры) — 5 лет (ст. 29 Федерального закона № 402-ФЗ);</li>
                <li>— данные из бухгалтерских документов — в соответствии с налоговым законодательством.</li>
              </ul>
              <p>По истечении сроков — уничтожение в течение 30 дней.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">6. Меры по защите персональных данных</h2>
              <p className="mb-3"><strong>6.1.</strong> Оператор принимает организационные, правовые и технические меры защиты ПДн, включая:</p>
              <ul className="list-none space-y-2 mb-4">
                <li>— ограничение доступа к ПДн;</li>
                <li>— использование защищённых каналов передачи данных (HTTPS);</li>
                <li>— хранение документов с ПДн в защищённых хранилищах.</li>
              </ul>
              <p className="mb-3"><strong>6.2. Инциденты безопасности.</strong> При выявлении факта утечки или несанкционированного доступа к ПДн Оператор:</p>
              <ul className="list-none space-y-2">
                <li>— уведомляет Роскомнадзор о факте инцидента — в течение 24 часов;</li>
                <li>— уведомляет Роскомнадзор о результатах расследования — в течение 72 часов (ч. 3.1 ст. 21 Федерального закона № 152-ФЗ);</li>
                <li>— уведомляет субъектов ПДн при наличии угрозы их правам и интересам.</li>
              </ul>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">7. Права субъекта персональных данных</h2>
              <p className="mb-3">Субъект вправе:</p>
              <ul className="list-none space-y-2 mb-3">
                <li>— получить доступ к своим ПДн и информацию об их обработке;</li>
                <li>— потребовать уточнения, блокирования или уничтожения ПДн;</li>
                <li>— отозвать согласие на обработку в любое время путём направления запроса на ai@aleksamois.ru — данные уничтожаются в течение 30 дней (кроме данных, обрабатываемых по иным законным основаниям);</li>
                <li>— обратиться в Роскомнадзор или суд за защитой своих прав.</li>
              </ul>
              <p>Отзыв согласия не влияет на законность обработки до момента отзыва.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">8. Трансграничная передача данных</h2>
              <p className="mb-3"><strong>8.1.</strong> Передача ПДн в государства, обеспечивающие адекватную защиту ПДн (по перечню Роскомнадзора), осуществляется без дополнительных условий.</p>
              <p className="mb-3"><strong>8.2.</strong> Передача ПДн в иные государства (в том числе Google LLC, США) осуществляется только:</p>
              <ul className="list-none space-y-2">
                <li>— при наличии согласия субъекта ПДн на трансграничную передачу;</li>
                <li>— после уведомления Роскомнадзора (ст. 12 Федерального закона № 152-ФЗ) и при отсутствии запрета с его стороны.</li>
              </ul>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">9. Файлы cookies</h2>
              <p className="mb-3"><strong>9.1.</strong> Сайт использует файлы cookies для обеспечения корректной работы, анализа посещаемости и улучшения пользовательского опыта. Первичный сбор данных через cookies осуществляется на серверах РФ.</p>
              <p><strong>9.2.</strong> Подробная информация — в <Link to="/legal/cookies" className="text-primary hover:underline">Политике использования cookies</Link>.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">10. Изменения в Политике</h2>
              <p className="mb-3">Оператор вправе вносить изменения. Актуальная версия размещена на https://aleksamois.ru/legal/privacy-policy/. Новая редакция вступает в силу с момента размещения.</p>
              <p>Настоящая редакция действует с 03 июня 2026 г.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">11. Контактные данные Оператора</h2>
              <p>ИП Моисеева Александра Алексеевна</p>
              <p>Email: ai@aleksamois.ru</p>
              <p>Телефон: +7 995 078 88 37</p>
              <p>Сайт: https://aleksamois.ru</p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
