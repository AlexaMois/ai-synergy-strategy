import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Политика использования cookies | Александра Моисеева</title>
        <meta name="description" content="Политика использования файлов cookies на сайте aleksamois.ru. Информация о типах cookies, целях использования и управлении настройками." />
        <link rel="canonical" href="https://aleksamois.ru/legal/cookies" />
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
            Политика использования файлов cookies
          </h1>

          <div className="text-right text-muted-foreground mb-8">
            <p className="font-medium">УТВЕРЖДАЮ</p>
            <p>ИП Моисеева Александра Алексеевна</p>
            <p>Красноярск, 2025</p>
          </div>

          <div className="text-muted-foreground leading-relaxed space-y-6">
            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">1. Что такое cookies</h2>
              <p className="mb-3">
                <strong>1.1.</strong> Cookies (куки) — это небольшие текстовые файлы, которые сохраняются на вашем устройстве (компьютере, смартфоне, планшете) при посещении веб-сайтов. Они позволяют сайту запоминать ваши предпочтения и действия.
              </p>
              <p>
                <strong>1.2.</strong> Настоящая Политика описывает, какие cookies используются на сайте https://aleksamois.ru (далее — Сайт), для каких целей и как вы можете управлять их использованием.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">2. Типы используемых cookies</h2>
              
              <h3 className="text-xl font-medium text-foreground mb-2 mt-4">2.1. Строго необходимые cookies</h3>
              <p className="mb-3">
                Эти cookies необходимы для работы Сайта и не могут быть отключены. Они используются для:
              </p>
              <ul className="list-none space-y-2 mb-4">
                <li>— обеспечения безопасности и работоспособности Сайта;</li>
                <li>— сохранения ваших настроек согласия на использование cookies;</li>
                <li>— работы форм обратной связи.</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-2">2.2. Аналитические cookies</h3>
              <p className="mb-3">
                Эти cookies помогают нам понять, как посетители взаимодействуют с Сайтом:
              </p>
              <ul className="list-none space-y-2 mb-4">
                <li><strong>Google Analytics (G-N9YG8876JX)</strong> — сбор анонимной статистики посещений, анализ поведения пользователей;</li>
                <li><strong>Яндекс.Метрика (99058653)</strong> — аналитика посещаемости, вебвизор, карты кликов.</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-2">2.3. Маркетинговые cookies</h3>
              <p className="mb-3">
                Эти cookies используются для показа релевантной рекламы:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Google Tag Manager (GTM-MV45KCXD)</strong> — управление тегами и отслеживание конверсий.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">3. Цели использования cookies</h2>
              <ul className="list-none space-y-2">
                <li>— обеспечение корректной работы Сайта;</li>
                <li>— анализ посещаемости и улучшение пользовательского опыта;</li>
                <li>— запоминание ваших предпочтений;</li>
                <li>— измерение эффективности рекламных кампаний;</li>
                <li>— персонализация контента и рекламы.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">4. Сроки хранения cookies</h2>
              <ul className="list-none space-y-2">
                <li><strong>Сессионные cookies</strong> — удаляются при закрытии браузера;</li>
                <li><strong>Постоянные cookies</strong> — хранятся от 30 дней до 2 лет в зависимости от типа.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">5. Управление cookies</h2>
              <p className="mb-3">
                <strong>5.1.</strong> Вы можете изменить настройки cookies в любое время:
              </p>
              <ul className="list-none space-y-2 mb-4">
                <li>— через баннер согласия на Сайте;</li>
                <li>— в настройках вашего браузера.</li>
              </ul>
              <p className="mb-3">
                <strong>5.2.</strong> Инструкции по управлению cookies в популярных браузерах:
              </p>
              <ul className="list-none space-y-2">
                <li>— <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                <li>— <a href="https://support.mozilla.org/ru/kb/cookies-informaciya-kotoruyu-veb-sajty-hranyat-na-" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                <li>— <a href="https://support.apple.com/ru-ru/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                <li>— <a href="https://browser.yandex.ru/help/personal-data-protection/cookies.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Яндекс Браузер</a></li>
              </ul>
              <p className="mt-4">
                <strong>5.3.</strong> Обратите внимание: отключение cookies может повлиять на функциональность Сайта.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">6. Передача данных третьим лицам</h2>
              <p>
                Данные, собранные с помощью cookies, могут передаваться сервисам аналитики и рекламы (Google, Яндекс) в обезличенном виде для целей, описанных в данной Политике.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">7. Контактные данные</h2>
              <p>ИП Моисеева Александра Алексеевна</p>
              <p>Email: ai@aleksamois.ru</p>
              <p>Телефон: +7 995 078 88 37</p>
              <p>Сайт: https://aleksamois.ru</p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-foreground mb-3">8. Изменения в политике</h2>
              <p className="mb-3">
                Мы оставляем за собой право обновлять данную Политику. Актуальная версия всегда доступна на этой странице.
              </p>
              <p>
                Дата последнего обновления: 3 января 2025 года
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
