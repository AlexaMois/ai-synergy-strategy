# Project rules

- The industry chat block ("Узнаёте свой бизнес?") keeps its outer size across question-text changes: its window height is pinned per industry in `src/components/home/IndustryQuestions.tsx` (`chatMinH`) and the messages distribute the leftover space (`justify-between`). When the block's content, font size or padding changes, re-check that each tab's rendered block height still matches the value it had before, and update the pinned heights only together with that check.
- Dark plates that host artwork whose own background is pure black use the semantic `ink` token (`bg-ink`) instead of `dark-bg`, and the artwork spans the plate edge to edge — this keeps the artwork and the plate seamless instead of showing a rectangular seam.
- Footer owns the company-logo marquee after Contact on inner pages; Partners suppresses legacy page-level placements there while preserving the homepage placement, so one shared logo list cannot render duplicate rows.
