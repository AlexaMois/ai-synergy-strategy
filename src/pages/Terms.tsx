import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
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
            Договор-оферта на оказание консультационных услуг
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">1. Общие положения</h2>
            <p className="text-muted-foreground leading-relaxed">
              Настоящий договор-оферта (далее — Договор) является официальным публичным предложением ИП Моисеевой Александры Алексеевны (далее — Исполнитель) заключить договор на оказание консультационных услуг в области внедрения AI-решений.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>Исполнитель:</strong><br />
              ИП Моисеева Александра Алексеевна<br />
              <strong>ИНН:</strong> 245906802500<br />
              <strong>ОГРНИП:</strong> 323246800027635<br />
              <strong>Email:</strong> neiroreshenia@yandex.com<br />
              <strong>Сайт:</strong> https://нейрорешения.рф
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">2. Термины и определения</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Исполнитель</strong> — ИП Моисеева Александра Алексеевна.</li>
              <li><strong>Заказчик</strong> — юридическое или физическое лицо, принявшее условия настоящего Договора.</li>
              <li><strong>Услуги</strong> — консультационные услуги по внедрению AI-решений, диагностике процессов, разработке AI-стратегии и архитектуры, сопровождению внедрения.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">3. Предмет договора</h2>
            <p className="text-muted-foreground leading-relaxed">
              Исполнитель обязуется оказать Заказчику консультационные услуги в области внедрения искусственного интеллекта, а Заказчик обязуется принять и оплатить эти услуги в соответствии с условиями настоящего Договора.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Перечень услуг:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li><strong>Экспресс-аудит процессов</strong> — диагностика текущих процессов компании, выявление точек применения AI</li>
              <li><strong>AI-стратегия и архитектура</strong> — разработка дорожной карты внедрения, проектирование архитектуры решений</li>
              <li><strong>Сопровождение внедрения</strong> — контроль качества, проверка подрядчиков, защита интересов бизнеса</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">4. Порядок оказания услуг</h2>
            <p className="text-muted-foreground leading-relaxed">
              4.1. Заказчик направляет запрос на оказание услуг через форму на сайте или по электронной почте.<br />
              4.2. Стороны согласовывают объем, сроки и стоимость услуг.<br />
              4.3. Исполнитель приступает к оказанию услуг после получения предоплаты (если предусмотрено).<br />
              4.4. По завершении работ Исполнитель предоставляет Заказчику отчет или результат консультации.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">5. Стоимость услуг и порядок оплаты</h2>
            <p className="text-muted-foreground leading-relaxed">
              5.1. Стоимость услуг определяется индивидуально и согласовывается с Заказчиком.<br />
              5.2. Оплата производится безналичным переводом на расчетный счет Исполнителя или иным согласованным способом.<br />
              5.3. Экспресс-аудит процессов (30 минут) предоставляется бесплатно.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">6. Права и обязанности сторон</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Исполнитель обязуется:</strong>
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Оказать услуги качественно и в согласованные сроки</li>
              <li>Соблюдать конфиденциальность информации Заказчика</li>
              <li>Предоставить результаты работы в согласованной форме</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-6">
              <strong>Заказчик обязуется:</strong>
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Своевременно предоставить необходимую информацию и документы</li>
              <li>Оплатить услуги в соответствии с условиями Договора</li>
              <li>Принять результаты оказанных услуг</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">7. Конфиденциальность</h2>
            <p className="text-muted-foreground leading-relaxed">
              Стороны обязуются не разглашать конфиденциальную информацию, полученную в ходе исполнения Договора, третьим лицам без письменного согласия другой Стороны.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">8. Ответственность сторон</h2>
            <p className="text-muted-foreground leading-relaxed">
              8.1. За неисполнение или ненадлежащее исполнение обязательств по настоящему Договору Стороны несут ответственность в соответствии с законодательством Российской Федерации.<br />
              8.2. Исполнитель не несет ответственности за результаты бизнес-решений Заказчика, принятых на основе консультаций.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">9. Порядок разрешения споров</h2>
            <p className="text-muted-foreground leading-relaxed">
              Все споры и разногласия решаются путем переговоров. При недостижении согласия спор передается на рассмотрение в суд в соответствии с законодательством Российской Федерации.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">10. Срок действия договора</h2>
            <p className="text-muted-foreground leading-relaxed">
              Договор вступает в силу с момента акцепта оферты Заказчиком и действует до полного исполнения обязательств Сторонами.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">11. Акцепт оферты</h2>
            <p className="text-muted-foreground leading-relaxed">
              Акцептом настоящей оферты является заполнение формы на сайте, отправка письма на электронную почту Исполнителя или иное действие, свидетельствующее о намерении Заказчика получить услуги.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">12. Заключительные положения</h2>
            <p className="text-muted-foreground leading-relaxed">
              Условия настоящего Договора могут быть изменены Исполнителем в одностороннем порядке с публикацией актуальной версии на сайте https://нейрорешения.рф
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>Дата публикации:</strong> 29.11.2025
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-4">Реквизиты Исполнителя</h2>
            <p className="text-muted-foreground leading-relaxed">
              ИП Моисеева Александра Алексеевна<br />
              <strong>ИНН:</strong> 245906802500<br />
              <strong>ОГРНИП:</strong> 323246800027635<br />
              <strong>Email:</strong> neiroreshenia@yandex.com<br />
              <strong>Сайт:</strong> https://нейрорешения.рф
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;