# 📖 Reading Tracker Project Plan

## Phase 1: Setup ✅

- [x] Create Next.js app
- [x] Setup folder structure
- [x] Setup routing
- [x] Setup UI layout & design system

## Phase 2: Core — Add & View Readings ✅

- [x] Reading data model (book / article / other) — `app/_lib/types.ts`
- [x] Zustand store with localStorage persistence — `app/_store/useReadingStore.ts`
- [x] Add Reading form (type picker → detail form) — `app/_components/AddReadingForm.tsx`
- [x] Book title typeahead via Open Library API — `app/_components/BookSearchInput.tsx`
- [x] Readings list page (filterable by type & status) — `app/readings/page.tsx`
- [x] Reading detail page — `app/readings/[id]/page.tsx`

## Phase 3: Book Enrichment ✅

- [x] Open Library cover & metadata auto-link — `app/_lib/openLibrary.ts`
- [x] Duplicate detection (same OL record or same title) — in `AddReadingForm`
- [x] Display linked cover image on detail & cards — `ReadingCard`, detail page

## Phase 4: Shelves & Status ✅

- [x] Shelves page grouped by status (Want to Read / Reading / Finished) — `app/shelves/page.tsx`
- [x] Status updates from detail page — inline buttons in `app/readings/[id]/page.tsx`
- [x] Move readings between statuses — via status buttons on detail page

## Phase 5: Reviews & Notes ✅

- [x] Notes textarea on reading detail — in `app/readings/[id]/page.tsx`
- [x] Star rating (1–5) — `app/_components/StarRating.tsx`
- [x] Review display on list cards — `ReadingCard.tsx` shows star rating

## Phase 6: Reading Statistics ✅

- [x] `ReadingProgress` data model (pagesRead, totalPages, wordsRead, hoursSpent) — `app/_lib/types.ts`
- [x] Progress inputs on reading detail page — `app/readings/[id]/page.tsx`
- [x] Percentage progress bar for books (when totalPages set) — detail page + `ReadingCard`
- [x] Aggregate stats on home dashboard (total hours, pages, words) — `HomeDashboard.tsx`

## Phase 7: Design System ✅

- [x] Dark "Cosmic Curator" theme — `app/globals.css` (CSS custom properties + Tailwind v4 tokens)
- [x] Space Grotesk + Manrope fonts via `next/font/google` — `app/layout.tsx`
- [x] Fixed sidebar navigation with active state — `app/_components/Navbar.tsx`
- [x] Fixed top header with glassmorphism — `app/layout.tsx`
- [x] Glassmorphism cards throughout (`backdrop-blur`, semi-transparent backgrounds)
- [x] Gradient progress bars with glow shadow
- [x] Full project documentation — `learn.md`

## Phase 8: UX Improvements

- [ ] Responsive design (mobile layout — sidebar collapses to bottom nav or hamburger)
- [ ] Loading skeletons while store hydrates from localStorage
- [ ] Empty states with illustrations on list/shelves pages
- [ ] Pagination or infinite scroll on readings list

## Phase 9: Advanced

- [ ] Authentication & multi-user support
- [ ] Reading streaks and goal tracking
- [ ] Export/import data (JSON backup)
- [ ] Performance optimization
