import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Consent = () => {
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
            Согласие на обработку персональных данных
          </h1>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="text-muted-foreground leading-relaxed">
              Заполняя любую форму на данном сайте, совершая звонок, отправляя сообщение в мессенджерах или по электронной почте, вы даете согласие ИП Моисеевой Александре Сергеевне на обработку ваших персональных данных в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">1. Субъект персональных данных</h2>
            <p className="text-muted-foreground leading-relaxed">
              Я, субъект персональных данных, действуя свободно, своей волей и в своем интересе, даю согласие ИП Моисеевой Александре Сергеевне (далее — Оператор) на обработку моих персональных данных.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">2. Перечень персональных данных</h2>
            <p className="text-muted-foreground leading-relaxed">
              Настоящим я даю согласие на обработку следующих персональных данных:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Фамилия, имя, отчество</li>
              <li>Контактный телефон</li>
              <li>Адрес электронной почты (e-mail)</li>
              <li>Должность и название организации</li>
              <li>Информация о профессиональной деятельности</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">3. Цели обработки персональных данных</h2>
            <p className="text-muted-foreground leading-relaxed">
              Персональные данные обрабатываются Оператором в целях:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Предоставления консультационных услуг по внедрению AI-решений</li>
              <li>Коммуникации с клиентом (звонки, email, мессенджеры)</li>
              <li>Заключения и исполнения договора на оказание услуг</li>
              <li>Информирования о новых услугах и специальных предложениях</li>
              <li>Проведения маркетинговых и аналитических исследований</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">4. Способы обработки персональных данных</h2>
            <p className="text-muted-foreground leading-relaxed">
              Оператор осуществляет обработку персональных данных следующими способами:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Сбор, запись, систематизация, накопление, хранение</li>
              <li>Уточнение (обновление, изменение)</li>
              <li>Извлечение, использование</li>
              <li>Передача (предоставление, доступ)</li>
              <li>Блокирование, удаление, уничтожение</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Обработка персональных данных осуществляется с использованием средств автоматизации и без использования таких средств.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">5. Передача персональных данных третьим лицам</h2>
            <p className="text-muted-foreground leading-relaxed">
              Оператор вправе передавать персональные данные третьим лицам в следующих случаях:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Субъект персональных данных выразил согласие на такие действия</li>
              <li>Передача необходима для исполнения договора</li>
              <li>Передача предусмотрена законодательством Российской Федерации</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">6. Срок действия согласия</h2>
            <p className="text-muted-foreground leading-relaxed">
              Настоящее согласие действует с момента его предоставления и в течение всего срока оказания услуг, а также в течение 5 (пяти) лет после окончания оказания услуг.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">7. Права субъекта персональных данных</h2>
            <p className="text-muted-foreground leading-relaxed">
              Я уведомлен(а) о том, что имею следующие права:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Получать информацию об обработке моих персональных данных</li>
              <li>Требовать уточнения персональных данных, их блокирования или уничтожения</li>
              <li>Отозвать согласие на обработку персональных данных путем направления письменного заявления на адрес: neiroreshenia@yandex.com</li>
              <li>Обжаловать действия или бездействие Оператора в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">8. Отзыв согласия</h2>
            <p className="text-muted-foreground leading-relaxed">
              Я проинформирован(а) о том, что согласие на обработку персональных данных может быть отозвано мною путем направления письменного заявления Оператору по адресу электронной почты: <a href="mailto:neiroreshenia@yandex.com" className="text-primary hover:text-primary/80">neiroreshenia@yandex.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">9. Контактная информация Оператора</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>ИП Моисеева Александра Сергеевна</strong><br />
              <strong>ИНН:</strong> [ИНН]<br />
              <strong>ОГРНИП:</strong> [ОГРНИП]<br />
              <strong>Email:</strong> neiroreshenia@yandex.com<br />
              <strong>Сайт:</strong> https://нейрорешения.рф
            </p>
          </section>

          <div className="bg-primary/5 p-6 rounded-lg mt-8">
            <p className="text-muted-foreground leading-relaxed">
              <strong>Подтверждение:</strong> Заполняя форму на сайте, отправляя сообщение или совершая звонок, я подтверждаю, что ознакомлен(а) с <Link to="/privacy-policy" className="text-primary hover:text-primary/80">Политикой в отношении обработки персональных данных</Link> и даю согласие на обработку моих персональных данных на изложенных выше условиях.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Consent;