import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";

const Consent = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Согласие на обработку персональных данных | Александра Моисеева</title>
        <meta name="description" content="Согласие на обработку персональных данных ИП Моисеева Александра Алексеевна. Цели обработки, перечень данных, права субъекта." />
        <link rel="canonical" href="https://aleksamois.ru/consent" />
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
            Согласие на обработку персональных данных
          </h1>

          <div className="text-muted-foreground leading-relaxed space-y-6">
            <p>
              Настоящим я, пользователь сайта https://нейрорешения.рф, свободно, своей волей и в своем интересе, даю свое согласие индивидуальному предпринимателю Моисеевой Александре Алексеевне (ИНН 245906802500, ОГРНИП 323246800027635), далее — Оператор, на обработку моих персональных данных, предоставленных через формы на указанном сайте, а также при обращении в мессенджеры, по телефону и электронной почте.
            </p>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">1. Цель обработки персональных данных:</h2>
              <ul className="list-none space-y-2">
                <li>— предоставление консультаций;</li>
                <li>— регистрация заявок на продукты и услуги, включая платформу «Нейро-Тендеролог»;</li>
                <li>— информирование о возможностях использования ИИ в бизнесе;</li>
                <li>— заключение и исполнение договоров;</li>
                <li>— аналитика поведения на сайте и улучшение качества обслуживания.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">2. Персональные данные, на обработку которых дается согласие:</h2>
              <ul className="list-none space-y-2">
                <li>— фамилия, имя, отчество;</li>
                <li>— контактный телефон;</li>
                <li>— адрес электронной почты;</li>
                <li>— организация, ИНН, род деятельности;</li>
                <li>— паспортные данные (при необходимости заключения договора);</li>
                <li>— иные сведения, предоставляемые добровольно в заявках, чатах и анкетах.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">3. Действия, совершаемые с персональными данными:</h2>
              <p>
                Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (в том числе третьим лицам в рамках выполнения обязательств), обезличивание, блокирование, удаление и уничтожение.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">4. Срок обработки персональных данных:</h2>
              <p>
                Персональные данные обрабатываются до достижения целей обработки или отзыва настоящего согласия. Срок хранения данных — 3 года с момента отзыва согласия, если иное не предусмотрено законодательством.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">5. Прочие условия:</h2>
              <p className="mb-4">
                Настоящее согласие является осознанным, конкретным, предметным и однозначным выражением воли субъекта персональных данных. Оператор принимает необходимые правовые, организационные и технические меры по защите персональных данных.
              </p>
              <p className="mb-4">
                Согласие может быть отозвано в любое время по письменному запросу субъекта на адрес электронной почты Оператора: neiroreshenia@yandex.com. Отзыв согласия не влияет на законность обработки до момента отзыва.
              </p>
              <p>
                Я подтверждаю, что предоставленные данные принадлежат лично мне и являются достоверными. Дата согласия проставляется в момент отправки формы или обращения через сайт.
              </p>
            </section>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mt-8">
              <p className="font-medium text-foreground mb-2">ИП Моисеева Александра Алексеевна</p>
              <p>Email: neiroreshenia@yandex.com</p>
              <p>Телефон: 8 (993) 721-73-67</p>
              <p>Сайт: https://нейрорешения.рф</p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Consent;