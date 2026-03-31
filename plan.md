# 📖 Reading Tracker Project Plan

## Phase 1: Setup ✅

- [x] Create Next.js app
- [x] Setup folder structure
- [x] Setup routing
- [x] Setup UI layout & design system (Galaxy Bubble Dance palette)

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

## Phase 5: Reviews & Notes

- [x] Notes textarea on reading detail — in `app/readings/[id]/page.tsx`
- [x] Star rating (1–5) — `app/_components/StarRating.tsx`
- [ ] Review display on list cards

## Phase 6: UX Improvements

- [ ] Loading skeletons
- [ ] Empty states with illustrations
- [ ] Responsive design
- [ ] Pagination / infinite scroll on readings list

## Phase 7: Advanced

- [ ] Authentication
- [ ] Dashboard stats & reading streaks
- [ ] Performance optimization
