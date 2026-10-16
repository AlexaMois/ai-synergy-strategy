# Project rules

- The industry chat block ("Узнаёте свой бизнес?") keeps its outer size across question-text changes: its window height is pinned per industry in `src/components/home/IndustryQuestions.tsx` (`chatMinH`) and the messages distribute the leftover space (`justify-between`). When the block's content, font size or padding changes, re-check that each tab's rendered block height still matches the value it had before, and update the pinned heights only together with that check.
