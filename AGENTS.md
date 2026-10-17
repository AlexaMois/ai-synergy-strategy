# Project rules

- The industry chat block ("Узнаёте свой бизнес?") keeps its outer size across question-text changes: its window height is pinned per industry in `src/components/home/IndustryQuestions.tsx` (`chatMinH`) and the messages distribute the leftover space (`justify-between`). When the block's content, font size or padding changes, re-check that each tab's rendered block height still matches the value it had before, and update the pinned heights only together with that check.
- Dark plates that host artwork whose own background is pure black use the semantic `ink` token (`bg-ink`) instead of `dark-bg`, and the artwork spans the plate edge to edge — this keeps the artwork and the plate seamless instead of showing a rectangular seam.
- Footer owns the company-logo marquee after Contact on inner pages; Partners suppresses legacy page-level placements there while preserving the homepage placement, so one shared logo list cannot render duplicate rows.
- Process assessment is calculated locally in a pure module; only explicit Contact submission sends its summary through the existing short-lead handler, preventing automatic CRM records and duplicate form flows.
- Contact intent is session-scoped and used only on /start; service identity and assessment are included in the mapped task field because catalog option IDs must never be invented.
- Assessment PDFs embed the existing local Cyrillic font and paginate text so exports work offline after the font loads without sending answers to another service.
