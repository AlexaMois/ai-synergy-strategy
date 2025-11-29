import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-20 max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Вернуться на главную
        </Link>

        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-semibold text-foreground mb-8">
            Политика в отношении обработки персональных данных
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">1. Общие положения</h2>
            <p className="text-muted-foreground leading-relaxed">
              Настоящая Политика в отношении обработки персональных данных (далее — Политика) разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению их безопасности.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>Оператор:</strong> ИП Моисеева Александра Сергеевна<br />
              <strong>Адрес:</strong> [Адрес регистрации ИП]<br />
              <strong>ИНН:</strong> [ИНН]<br />
              <strong>ОГРНИП:</strong> [ОГРНИП]<br />
              <strong>Email:</strong> neiroreshenia@yandex.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">2. Основные понятия</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Персональные данные</strong> — любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу.</li>
              <li><strong>Обработка персональных данных</strong> — любое действие или совокупность действий, совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными.</li>
              <li><strong>Оператор</strong> — ИП Моисеева Александра Сергеевна, самостоятельно или совместно с другими лицами организующий и (или) осуществляющий обработку персональных данных.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">3. Категории персональных данных</h2>
            <p className="text-muted-foreground leading-relaxed">
              Оператор обрабатывает следующие категории персональных данных:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Фамилия, имя, отчество</li>
              <li>Контактные данные (телефон, email)</li>
              <li>Должность и название организации</li>
              <li>Информация о профессиональной деятельности</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">4. Цели обработки персональных данных</h2>
            <p className="text-muted-foreground leading-relaxed">
              Персональные данные обрабатываются в следующих целях:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Предоставление консультационных услуг по внедрению AI-решений</li>
              <li>Связь с клиентами по вопросам оказания услуг</li>
              <li>Выполнение договорных обязательств</li>
              <li>Информирование о новых услугах и предложениях</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">5. Правовые основания обработки</h2>
            <p className="text-muted-foreground leading-relaxed">
              Обработка персональных данных осуществляется на основании:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Согласия субъекта персональных данных</li>
              <li>Договора, стороной которого является субъект персональных данных</li>
              <li>Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">6. Порядок и условия обработки</h2>
            <p className="text-muted-foreground leading-relaxed">
              Обработка персональных данных осуществляется с соблюдением принципов:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Законности и справедливой основы</li>
              <li>Ограничения обработки достижением конкретных, заранее определенных целей</li>
              <li>Соответствия содержания и объема обработки персональных данных заявленным целям</li>
              <li>Недопущения объединения баз данных, содержащих персональные данные</li>
              <li>Хранения персональных данных в форме, позволяющей определить субъекта, не дольше, чем этого требуют цели их обработки</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">7. Меры по обеспечению безопасности</h2>
            <p className="text-muted-foreground leading-relaxed">
              Оператор принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, предоставления, распространения, а также от иных неправомерных действий.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">8. Права субъектов персональных данных</h2>
            <p className="text-muted-foreground leading-relaxed">
              Субъект персональных данных имеет право:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Получать информацию, касающуюся обработки его персональных данных</li>
              <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обжаловать действия или бездействие Оператора в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">9. Контактная информация</h2>
            <p className="text-muted-foreground leading-relaxed">
              По всем вопросам, касающимся обработки персональных данных, вы можете обратиться по адресу: <a href="mailto:neiroreshenia@yandex.com" className="text-primary hover:text-primary/80">neiroreshenia@yandex.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">10. Заключительные положения</h2>
            <p className="text-muted-foreground leading-relaxed">
              Настоящая Политика может быть изменена Оператором в одностороннем порядке. Актуальная версия Политики размещается на сайте <a href="https://нейрорешения.рф" className="text-primary hover:text-primary/80">https://нейрорешения.рф</a>
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>Дата вступления в силу:</strong> 29.11.2025
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;