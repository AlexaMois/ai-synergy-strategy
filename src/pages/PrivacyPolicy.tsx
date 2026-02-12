import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Политика конфиденциальности | Александра Моисеева</title>
        <meta name="description" content="Политика компании в отношении обработки персональных данных ИП Моисеева Александра Алексеевна. Условия хранения, права субъекта ПДн." />
        <link rel="canonical" href="https://aleksamois.ru/privacy-policy" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <Navigation />
      
      <main className="container mx-auto px-4 py-10 md:py-16 lg:py-20 max-w-6xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Вернуться на главную
        </Link>

        <article className="prose prose-lg max-w-none">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-8">
            Политика компании в отношении обработки персональных данных
          </h1>

          <div className="text-right text-muted-foreground mb-8">
            <p className="font-medium">УТВЕРЖДАЮ</p>
            <p>ИП Моисеева Александра Алексеевна</p>
            <p>Красноярск, 2024</p>
          </div>

          <div className="text-muted-foreground leading-relaxed space-y-6">
            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">1. Общие положения</h2>
              <p className="mb-3">
                <strong>1.1.</strong> Настоящая Политика разработана в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ "О персональных данных" (далее — ФЗ-152) и определяет порядок обработки и меры по обеспечению безопасности персональных данных (ПДн), осуществляемые индивидуальным предпринимателем Моисеевой Александрой Алексеевной, ИНН 245906802500, ОГРНИП 323246800027635 (далее — Оператор).
              </p>
              <p>
                <strong>1.2.</strong> Политика применяется ко всем персональным данным, которые Оператор получает от субъектов ПДн при использовании сайта https://нейрорешения.рф, платформы "Нейро-Тендеролог", а также через формы обратной связи, мессенджеры, email и иные каналы.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">2. Термины и определения</h2>
              <ul className="list-none space-y-2">
                <li><strong>персональные данные (ПДн)</strong> — любая информация, относящаяся к прямо или косвенно определяемому физическому лицу;</li>
                <li><strong>обработка ПДн</strong> — любые действия с ПДн, включая сбор, систематизацию, хранение, уточнение, использование, передачу, обезличивание, уничтожение и др.;</li>
                <li><strong>автоматизированная обработка</strong> — обработка ПДн с использованием средств вычислительной техники;</li>
                <li><strong>оператор</strong> — лицо, организующее и (или) осуществляющее обработку ПДн;</li>
                <li><strong>субъект ПДн</strong> — физическое лицо, к которому относятся персональные данные.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">3. Цели обработки персональных данных</h2>
              <p className="mb-2">Оператор осуществляет обработку ПДн для:</p>
              <ul className="list-none space-y-2">
                <li>регистрации и взаимодействия с пользователями сайта и сервисов;</li>
                <li>заключения и исполнения договоров (в т.ч. оферты);</li>
                <li>информирования об услугах и продуктах Оператора;</li>
                <li>выполнения требований законодательства РФ;</li>
                <li>повышения качества обслуживания, аналитики и развития платформы.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">4. Правовые основания обработки</h2>
              <ul className="list-none space-y-2">
                <li>согласие субъекта ПДн (в форме, соответствующей требованиям закона);</li>
                <li>заключение и исполнение договора с субъектом ПДн;</li>
                <li>исполнение обязанностей по закону (например, хранение бухгалтерских документов).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">5. Перечень обрабатываемых персональных данных</h2>
              <ul className="list-none space-y-2">
                <li>фамилия, имя, отчество;</li>
                <li>адрес электронной почты;</li>
                <li>контактный телефон;</li>
                <li>организация, ИНН, род деятельности;</li>
                <li>паспортные данные (если требуется для заключения договора);</li>
                <li>иные сведения, предоставленные пользователем добровольно.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">6. Условия обработки и хранения персональных данных</h2>
              <p className="mb-3">
                <strong>6.1.</strong> Оператор осуществляет обработку ПДн как с использованием автоматизированных средств, так и без.
              </p>
              <p className="mb-3">
                <strong>6.2.</strong> Передача ПДн третьим лицам допускается только в рамках исполнения обязательств (например, организация рассылки через Telegram-канал, доступ к документам через Яндекс.Диск и др.) или в случаях, установленных законом.
              </p>
              <p className="mb-3">
                <strong>6.3.</strong> Оператор принимает все предусмотренные меры по защите ПДн, включая организационные, правовые и технические меры.
              </p>
              <p>
                <strong>6.4.</strong> ПДн хранятся до достижения целей обработки или до получения письменного отзыва согласия от субъекта, если иное не предусмотрено законодательством. Стандартный срок хранения — не более 3 лет после отзыва согласия.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">7. Права субъекта персональных данных</h2>
              <p className="mb-2">Субъект имеет право:</p>
              <ul className="list-none space-y-2">
                <li>на доступ к своим персональным данным;</li>
                <li>на уточнение, блокировку или уничтожение данных;</li>
                <li>на отзыв согласия на обработку в любое время (по запросу на email Оператора);</li>
                <li>на защиту своих прав, в том числе через обращение в Роскомнадзор или суд.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">8. Контактные данные Оператора</h2>
              <p>ИП Моисеева Александра Алексеевна</p>
              <p>Email: ai@aleksamois.ru</p>
              <p>Телефон: +7 995 078 88 37</p>
              <p>Сайт: https://нейрорешения.рф</p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">9. Использование файлов cookies</h2>
              <p className="mb-3">
                <strong>9.1.</strong> Сайт использует файлы cookies для обеспечения корректной работы, анализа посещаемости и улучшения пользовательского опыта.
              </p>
              <p className="mb-3">
                <strong>9.2.</strong> При первом посещении Сайта пользователь информируется об использовании cookies и может управлять настройками согласия.
              </p>
              <p>
                <strong>9.3.</strong> Подробная информация о типах cookies, целях их использования и способах управления содержится в{" "}
                <Link to="/legal/cookies" className="text-primary hover:underline">Политике использования cookies</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">10. Изменения в политике</h2>
              <p className="mb-3">
                Оператор имеет право вносить изменения в настоящую Политику. Актуальная версия всегда доступна на официальном сайте Оператора. Новая редакция вступает в силу с момента размещения, если иное не предусмотрено.
              </p>
              <p>
                Настоящая редакция действует с момента публикации и действует бессрочно до её замены.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;