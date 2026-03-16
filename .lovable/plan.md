

## План: Улучшение аналитики и снижение bounce rate

### Что конкретно сделаем (4 задачи)

---

### 1. UTM-трекинг
**Файл:** `src/utils/analytics.ts`

Добавим функции для захвата UTM-параметров (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) из URL при загрузке страницы. Сохраняем в `sessionStorage`. Передаём UTM-данные во все существующие analytics-события (`trackCTAClick`, `trackFormSubmission`, `trackDownload`, `trackScrollDepth`) как дополнительные параметры в GA и Яндекс.Метрику.

**Файл:** `src/pages/Index.tsx` — вызываем `captureUTMParams()` в useEffect при загрузке.

Это позволит отличить Telegram-трафик (если ссылки размечены) от настоящего Direct.

---

### 2. Мобильный триггер для ExitIntentPopup
**Файл:** `src/components/ExitIntentPopup.tsx`

Сейчас popup срабатывает только по `mouseleave` (десктоп). На мобиле он **никогда не показывается**.

Добавим альтернативный триггер для мобильных:
- Через **45 секунд** на странице **И** скролл ≥ 40% — показываем popup
- Детекция мобильного через `window.matchMedia('(max-width: 767px)')`
- Сохраняем ту же логику `sessionStorage` (раз за сессию)

---

### 3. Трекинг Яндекс.Метрики для CTA-событий
**Файл:** `src/utils/analytics.ts`

Сейчас `trackCTAClick` и `trackFormSubmission` отправляют данные **только в GA**. Яндекс.Метрика получает только scroll depth. Добавим `window.ym(YANDEX_COUNTER_ID, 'reachGoal', ...)` в:
- `trackCTAClick` → goal `cta_click`
- `trackFormSubmission` → goal `form_submit`
- `trackDownload` → goal `download`

Это даст полную картину конверсий в обеих системах аналитики.

---

### 4. Трекинг времени на странице (engagement time)
**Файл:** `src/utils/analytics.ts`

Добавим трекинг «активного времени» — отправляем событие `engaged_visit` в GA и Яндекс, если пользователь провёл на странице ≥ 30 секунд. Это поможет отфильтровать ботов (они обычно уходят за 0-2 сек) и понять реальный engagement.

---

### Итого: 2 файла

| Файл | Изменения |
|-------|-----------|
| `src/utils/analytics.ts` | UTM-захват, Яндекс goals для CTA/form/download, engagement time трекинг |
| `src/components/ExitIntentPopup.tsx` | Мобильный триггер (таймер + scroll depth) |

