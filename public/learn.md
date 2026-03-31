# Book Tracker — Full Project Guide

A complete explanation of how this project is structured, how data flows, and how to manage it.

---

## 1. What This App Does

**Book Tracker** is a reading journal. Users can:
- Add books, articles, or other readings
- Search for books via the free Open Library API (auto-fills author, cover, year)
- Organize readings into shelves: *Want to Read*, *Currently Reading*, *Finished*
- Rate readings (1–5 stars) and add personal notes
- Track reading progress: pages read, total pages (% bar for books), words read, hours spent
- See a dashboard with aggregate stats: total hours, pages, and words across all readings
- Filter all readings by type and status

**There is no backend or database.** All data lives in the browser's `localStorage`.

---

## 2. Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.1 |
| UI | React | 19.2.4 |
| Styling | Tailwind CSS | v4 |
| State | Zustand (with persist) | 5.x |
| HTTP | Axios | 1.x |
| Language | TypeScript (strict) | 5.x |
| Storage | Browser localStorage | — |
| External API | Open Library | Free, no key |

---

## 3. Project Structure

```
book-tracker/
├── app/
│   ├── _components/          # Reusable UI components
│   ├── _lib/                 # Types, utilities, API wrappers
│   ├── _store/               # Zustand state store
│   ├── readings/             # Route: list, add, and detail pages
│   │   ├── page.tsx          #   /readings
│   │   ├── new/page.tsx      #   /readings/new
│   │   └── [id]/page.tsx     #   /readings/:id
│   ├── shelves/
│   │   └── page.tsx          #   /shelves
│   ├── layout.tsx            # Root HTML layout (Navbar + font)
│   ├── page.tsx              # Home page  /
│   └── globals.css           # Design tokens + Tailwind base
├── public/                   # Static assets
├── next.config.ts            # Allows Open Library image URLs
├── tsconfig.json             # TypeScript config (@/* alias)
├── postcss.config.mjs        # Tailwind PostCSS plugin
└── package.json              # Scripts and dependencies
```

The `_` prefix on `_components`, `_lib`, and `_store` is a Next.js convention meaning "not a route" — they are private folders.

---

## 4. Data Model

Defined in `app/_lib/types.ts`.

### `Reading` — the core entity

```ts
interface Reading {
  id: string;                          // UUID, auto-generated
  type: "book" | "article" | "other";
  title: string;
  author: string | null;
  status: "want-to-read" | "reading" | "finished";
  url: string | null;                  // Only used for articles/other
  notes: string | null;                // User's personal notes
  rating: 1 | 2 | 3 | 4 | 5 | null;  // Star rating
  linkedBook: OpenLibraryLink | null;  // Metadata from Open Library
  progress: ReadingProgress | null;    // User-tracked reading stats
  createdAt: string;                   // ISO timestamp
  updatedAt: string;                   // ISO timestamp
}
```

### `ReadingProgress` — user-entered reading stats

```ts
interface ReadingProgress {
  pagesRead: number | null;   // How many pages the user has read
  totalPages: number | null;  // Used to compute % completion (books only)
  wordsRead: number | null;   // Approximate words read
  hoursSpent: number | null;  // Time invested (supports decimals, e.g. 1.5)
}
```

All four fields are optional — the user can fill in any combination. When `totalPages` is set for a book, a progress bar shows the percentage on the detail page.

### `OpenLibraryLink` — attached metadata when a book is matched

```ts
interface OpenLibraryLink {
  olid: string;           // Open Library Work ID (e.g. "OL123W")
  coverUrl: string | null;
  author: string;
  year: number | null;
}
```

---

## 5. State Management

**File:** `app/_store/useReadingStore.ts`

Uses **Zustand** with the `persist` middleware. The store is automatically synced to `localStorage` under the key `"reading-tracker-v1"`.

### Store shape

```ts
{
  readings: Reading[];
  addReading(reading: Reading): void;
  updateReading(id: string, patch: Partial<Reading>): void;
  removeReading(id: string): void;
}
```

### Rules
- `id` and `createdAt` are **immutable** — `updateReading` ignores them.
- Every `updateReading` call **automatically sets `updatedAt`** to the current time.
- The store is marked `"use client"` — it only runs in the browser.

### Usage pattern in components

```ts
import { useReadingStore } from "@/app/_store/useReadingStore";

const readings = useReadingStore((s) => s.readings);
const add = useReadingStore((s) => s.addReading);
```

---

## 6. Open Library Integration

**File:** `app/_lib/openLibrary.ts`

```ts
searchOpenLibrary(query: string): Promise<OpenLibraryCandidate[]>
```

- Calls `https://openlibrary.org/search.json?title={query}&limit=5&fields=...`
- Returns up to 5 candidates with: `olid`, `title`, `author`, `year`, `coverUrl`
- Cover images come from `https://covers.openlibrary.org/b/id/{id}-M.jpg`
- Returns `[]` on error (never throws)
- No API key needed

The `next.config.ts` whitelists `covers.openlibrary.org` so Next.js `<Image>` can display those covers.

---

## 7. How Data Flows

### Adding a reading

```
User opens /readings/new
  → AddReadingForm renders

User picks type = "book", types a title
  → BookSearchInput fires after 400ms debounce
  → searchOpenLibrary() hits Open Library API
  → Dropdown shows up to 5 results

User selects a result
  → Title, author, linkedBook auto-filled

User fills status, optional rating/notes, submits
  → Duplicate check (by OLID or title match in store)
  → generateId() + now() create id and createdAt
  → useReadingStore.addReading() saves to Zustand
  → Zustand persist writes to localStorage
  → Router navigates to /readings/{id}
```

### Viewing and editing

```
/readings/{id}
  → Reads reading from store by id
  → Clicking a status button → updateReading({ status })
  → Clicking a star → updateReading({ rating })
  → Leaving the notes field → updateReading({ notes })
  → Delete button (with confirmation) → removeReading(id)
```

### List pages

```
/readings     → Reads all from store, filters by type + status
/shelves      → Groups all readings by status into three shelves
/             → HomeDashboard counts readings by status for stats cards
```

---

## 8. Components

| Component | File | Purpose |
|---|---|---|
| `Navbar` | `_components/Navbar.tsx` | Top nav with links |
| `ClientOnly` | `_components/ClientOnly.tsx` | Prevents SSR/hydration mismatch for store-dependent UI |
| `HomeDashboard` | `_components/HomeDashboard.tsx` | Stats + shelf preview on home page |
| `ReadingCard` | `_components/ReadingCard.tsx` | Card showing a reading summary; links to detail |
| `StatusBadge` | `_components/StatusBadge.tsx` | Colored badge for reading status |
| `StarRating` | `_components/StarRating.tsx` | Interactive or read-only 5-star rating |
| `BookSearchInput` | `_components/BookSearchInput.tsx` | Autocomplete that queries Open Library |
| `AddReadingForm` | `_components/AddReadingForm.tsx` | Full form for adding a new reading |

### `ClientOnly` — why it exists

Zustand reads from `localStorage`, which doesn't exist on the server. Without wrapping store-dependent components in `ClientOnly`, Next.js would render different HTML on the server vs. the browser, causing a React hydration error.

```tsx
// Safe pattern for any store-reading component
<ClientOnly>
  <HomeDashboard />
</ClientOnly>
```

---

## 9. Pages / Routes

| Route | File | Type | Description |
|---|---|---|---|
| `/` | `app/page.tsx` | Server | Hero + HomeDashboard |
| `/readings` | `app/readings/page.tsx` | Client | Filterable list of all readings |
| `/readings/new` | `app/readings/new/page.tsx` | Server | Renders AddReadingForm |
| `/readings/[id]` | `app/readings/[id]/page.tsx` | Client | Detail + edit + delete |
| `/shelves` | `app/shelves/page.tsx` | Client | Three shelves grouped by status |

---

## 10. Styling System

**File:** `app/globals.css`

The design system is called **"Galaxy Bubble Dance"** — a dark purple/blue palette.

| Token | Hex | Used for |
|---|---|---|
| `--prussian-blue` | `#09192d` | Dark headings, main text |
| `--space-indigo` | `#212152` | Secondary text |
| `--persian-blue` | `#4c36be` | Primary action buttons |
| `--electric-sapphire` | `#5e71ec` | Secondary actions |
| `--wisteria-blue` | `#9ba8fa` | Borders, hints |
| `--blue-violet` | `#892ed3` | Accents |
| `--lavender-purple` | `#9c55e5` | "Reading" status |
| `--pink-orchid` | `#edbce5` | Ratings, danger |

Tailwind v4 is used throughout. Custom tokens are defined in `globals.css` as CSS variables and referenced in Tailwind utility classes.

---

## 11. Utilities

**File:** `app/_lib/utils.ts`

```ts
generateId(): string   // → crypto.randomUUID()
now(): string          // → new Date().toISOString()
```

Both are used in `AddReadingForm` when creating a new reading object.

---

## 12. Progress Tracking

### How it works

Each `Reading` has a `progress` field (null by default) containing four user-input numbers:

| Field | What it tracks |
|---|---|
| `pagesRead` | Pages the user has read so far |
| `totalPages` | Total pages in the book (used for % bar) |
| `wordsRead` | Words read (approximate, user-entered) |
| `hoursSpent` | Time spent reading (supports decimals like 1.5) |

All fields are optional — the user can fill in any combination.

### Where it appears

**Detail page** (`/readings/[id]`):
- A "Progress" card is shown with number inputs for each field.
- For **books only**: if `totalPages` is set, a percentage progress bar is shown above the inputs.
- Inputs save on blur (same pattern as Notes), calling `updateProgress()` which merges the changed field into the existing progress object.

**Home dashboard** (`/`):
- A "Reading Activity" stats row shows three aggregate totals: **hours spent**, **pages read**, and **words read** summed across all readings.

### Key implementation detail

The `updateProgress` helper in the detail page always constructs a full `ReadingProgress` object (filling nulls for fields not being updated) to avoid partial-overwrites losing existing data:

```ts
function updateProgress(field: keyof ReadingProgress, raw: string) {
  const value = raw !== "" ? Number(raw) : null;
  updateReading(id, {
    progress: {
      pagesRead: reading.progress?.pagesRead ?? null,
      totalPages: reading.progress?.totalPages ?? null,
      wordsRead: reading.progress?.wordsRead ?? null,
      hoursSpent: reading.progress?.hoursSpent ?? null,
      [field]: value,
    },
  });
}
```

---

## 13. NPM Scripts

```bash
npm run dev     # Start dev server (hot reload)
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # Run ESLint
```

---

## 14. Important Constraints & Gotchas

1. **No backend.** All data is in `localStorage`. Clearing browser data wipes everything. If you want persistence across devices or users, you'd need to add a backend.

2. **`"use client"` is required** for any component that uses the Zustand store, React hooks with side effects, or browser APIs.

3. **`ClientOnly` wrapper** must wrap any component that reads from the store inside a Server Component, to avoid hydration mismatches.

4. **Open Library search** only works for books. Articles and "other" types have no search — the author/title must be entered manually.

5. **Duplicate detection** checks by OLID first (if a book is linked), then falls back to case-insensitive title match. It shows a confirmation dialog rather than hard-blocking.

6. **Image domains** are whitelisted in `next.config.ts`. If you add another book cover source, add it there.

7. **Zustand store key** is `"reading-tracker-v1"`. If you change the data shape significantly, bump the version key to avoid loading corrupt old data.

---

## 15. How to Make Common Changes

### Add a new field to a reading (e.g., `genre`)

1. Add it to the `Reading` interface in `app/_lib/types.ts`
2. Add it to `AddReadingForm.tsx` (form input)
3. Display it in `readings/[id]/page.tsx` (detail page)
4. Optionally show it in `ReadingCard.tsx`
5. If you want to filter by it, update `readings/page.tsx`
6. Bump the localStorage key in `useReadingStore.ts` to `"reading-tracker-v2"`

### Add a new page/route

Create a folder inside `app/` with a `page.tsx` file. Add a link in `Navbar.tsx`.

### Change the color scheme

Edit the CSS custom properties in `app/globals.css` under `:root`.

### Add a real backend

Replace the Zustand persist store with API calls. The `Reading` type stays the same — only the store actions change.
