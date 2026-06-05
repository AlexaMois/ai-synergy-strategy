
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Политика использования cookies | Александра Моисеева</title>
        <meta name="description" content="Политика использования файлов cookies на сайте aleksamois.ru. Информация о типах cookies, целях использования и управлении настройками." />
        <link rel="canonical" href="https://aleksamois.ru/legal/cookies" />
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-8">
            Политика использования файлов cookies
          </h1>

          <div className="text-right text-muted-foreground mb-8">
            <p className="font-medium">УТВЕРЖДАЮ</p>
            <p>ИП Моисеева Александра Алексеевна</p>
            <p>г. Красноярск, 03 июня 2026 г.</p>
          </div>

          <div className="text-muted-foreground leading-relaxed space-y-6">
            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">1. Что такое cookies</h2>
              <p className="mb-3">
                <strong>1.1.</strong> Cookies (куки) — это небольшие текстовые файлы, которые сохраняются на вашем устройстве (компьютере, смартфоне, планшете) при посещении веб-сайтов. Они позволяют сайту запоминать ваши предпочтения и действия.
              </p>
              <p>
                <strong>1.2.</strong> Настоящая Политика описывает, какие cookies используются на сайте https://aleksamois.ru (далее — Сайт), для каких целей и как вы можете управлять их использованием. Использование Сайта без отзыва согласия на cookies означает ваше согласие с настоящей Политикой.
              </p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">2. Правовое основание</h2>
              <p className="mb-3">Обработка данных через cookies осуществляется на основании:</p>
              <ul className="list-none space-y-2">
                <li>— Федерального закона № 152-ФЗ «О персональных данных» в редакции с учётом изменений, вступивших в силу с 01.07.2025 и 01.09.2025;</li>
                <li>— согласия пользователя, выраженного через баннер на Сайте (ч. 1 ст. 9 Федерального закона № 152-ФЗ).</li>
              </ul>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">3. Типы используемых cookies</h2>

              <h3 className="text-xl font-medium text-foreground mb-2 mt-4">3.1. Строго необходимые cookies</h3>
              <p className="mb-3">
                Необходимы для работы Сайта. Не могут быть отключены. Согласие на них не требуется.
              </p>
              <ul className="list-none space-y-2 mb-4">
                <li>— безопасность и работоспособность — корректная загрузка страниц Сайта;</li>
                <li>— сохранение настроек согласия — фиксация вашего выбора по cookies;</li>
                <li>— работа форм обратной связи — передача заявок и сообщений.</li>
              </ul>
              <p className="mb-4"><em>Срок хранения: сессионные (удаляются при закрытии браузера) или до 12 месяцев.</em></p>

              <h3 className="text-xl font-medium text-foreground mb-2">3.2. Аналитические cookies</h3>
              <p className="mb-3">
                Используются для понимания поведения посетителей на Сайте. Требуют вашего согласия.
              </p>
              <ul className="list-none space-y-2 mb-4">
                <li><strong>Яндекс Метрика (99058653)</strong> — аналитика посещаемости, вебвизор, карты кликов. Серверы РФ.</li>
                <li><strong>Google Analytics (G-N9YG8876JX)</strong> — сбор статистики посещений, анализ поведения. Серверы Google LLC (США) — трансграничная передача*.</li>
              </ul>
              <p className="mb-4 text-sm">
                * Использование Google Analytics сопряжено с трансграничной передачей данных на серверы Google LLC (США). Такая передача осуществляется только при наличии вашего явного согласия. Уведомление о трансграничной передаче направлено в Роскомнадзор в соответствии со ст. 12 Федерального закона № 152-ФЗ. Первичный сбор данных осуществляется на серверах в РФ.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-2">3.3. Маркетинговые cookies</h3>
              <p className="mb-3">
                Используются для управления тегами и измерения конверсий. Требуют вашего согласия.
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Google Tag Manager (GTM-MV45KCXD)</strong> — управление тегами и отслеживание конверсий. Серверы Google LLC (США) — трансграничная передача*.</li>
              </ul>
              <p className="mt-3 text-sm">* Аналогично п. 3.2.</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">4. Цели использования cookies</h2>
              <ul className="list-none space-y-2">
                <li>— обеспечение корректной работы Сайта;</li>
                <li>— анализ посещаемости и улучшение пользовательского опыта;</li>
                <li>— запоминание ваших предпочтений;</li>
                <li>— измерение эффективности обращений на Сайт;</li>
                <li>— персонализация контента.</li>
              </ul>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">5. Сроки хранения cookies</h2>
              <ul className="list-none space-y-2">
                <li><strong>Сессионные</strong> — удаляются при закрытии браузера;</li>
                <li><strong>Постоянные (аналитика)</strong> — до 26 месяцев (Яндекс Метрика, Google Analytics);</li>
                <li><strong>Постоянные (согласие)</strong> — до 12 месяцев;</li>
                <li><strong>Маркетинговые</strong> — до 24 месяцев.</li>
              </ul>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">6. Управление cookies</h2>
              <p className="mb-3">
                <strong>6.1.</strong> Вы можете управлять настройками cookies в любое время:
              </p>
              <ul className="list-none space-y-2 mb-4">
                <li>— через баннер согласия при первом посещении Сайта;</li>
                <li>— в настройках вашего браузера.</li>
              </ul>
              <p className="mb-3">
                <strong>6.2.</strong> Инструкции по управлению cookies в популярных браузерах:
              </p>
              <ul className="list-none space-y-2">
                <li>— <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                <li>— <a href="https://support.mozilla.org/ru/kb/cookies-informaciya-kotoruyu-veb-sajty-hranyat-na-" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                <li>— <a href="https://support.apple.com/ru-ru/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                <li>— <a href="https://browser.yandex.ru/help/personal-data-protection/cookies.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Яндекс Браузер</a></li>
              </ul>
              <p className="mt-4">
                <strong>6.3.</strong> Отключение аналитических и маркетинговых cookies не влияет на базовую работу Сайта. Отключение строго необходимых cookies может нарушить функциональность форм и настроек.
              </p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">7. Передача данных</h2>
              <p className="mb-3">
                <strong>7.1.</strong> Данные, собранные через аналитические cookies (Яндекс Метрика), обрабатываются на серверах в РФ.
              </p>
              <p className="mb-3">
                <strong>7.2.</strong> Данные через Google Analytics и Google Tag Manager передаются на серверы Google LLC (США). Такая передача является трансграничной в соответствии со ст. 12 Федерального закона № 152-ФЗ. Передача осуществляется только при наличии явного согласия пользователя и при условии подачи уведомления в Роскомнадзор.
              </p>
              <p>
                <strong>7.3.</strong> Данные не продаются третьим лицам и не используются для идентификации конкретного пользователя в маркетинговых целях без его согласия.
              </p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">8. Права пользователя</h2>
              <p className="mb-3">Вы вправе:</p>
              <ul className="list-none space-y-2">
                <li>— в любой момент отозвать согласие на cookies через баннер или настройки браузера;</li>
                <li>— потребовать удаления cookies — через настройки браузера;</li>
                <li>— обратиться с запросом об обработке ваших данных: ai@aleksamois.ru.</li>
              </ul>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">9. Контактные данные</h2>
              <p>ИП Моисеева Александра Алексеевна</p>
              <p>Email: ai@aleksamois.ru</p>
              <p>Телефон: +7 995 078 88 37</p>
              <p>Сайт: https://aleksamois.ru</p>
            </section>

            <section>
              <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-semibold !leading-tight text-foreground mb-3">10. Изменения в политике</h2>
              <p className="mb-3">
                Настоящая Политика может обновляться. Актуальная версия всегда доступна на странице https://aleksamois.ru/legal/cookies. При существенных изменениях — баннер с уведомлением при следующем посещении Сайта.
              </p>
              <p>
                Дата последнего обновления: 03 июня 2026 г.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default CookiesPolicy;
