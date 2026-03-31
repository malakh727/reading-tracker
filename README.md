# 📖 Reading Tracker

A modern reading tracker for books, articles, and more — built with Next.js.
<img width="1833" height="892" alt="image" src="https://github.com/user-attachments/assets/a38447ec-95a9-4de6-82ca-b73f8413bbbb" />


## Features

- Track any reading: books, articles, or anything else
- Book title lookup via Open Library (auto-fills cover, author, year)
- Personal shelves: Want to Read / Currently Reading / Finished
- Star ratings and notes per reading
- Progress tracking: pages read / total pages (with % bar), words read, hours spent — all user-input
- Aggregate reading stats on the dashboard: total hours, pages, and words across all readings
- Duplicate detection when adding the same book twice
- Fully client-side with localStorage persistence

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Zustand (state management + localStorage persistence)
- Tailwind CSS v4
- Open Library API (book metadata, free, no key required)
- Axios

## Key Concepts

- Component-based architecture
- Global state with Zustand persist middleware
- External API integration (Open Library)
- Hydration-safe client store access

## Screenshots

<img width="1833" height="892" alt="image" src="https://github.com/user-attachments/assets/8343e8c4-a563-47cc-a596-1efcaf9b1488" />

<img width="1833" height="892" alt="image" src="https://github.com/user-attachments/assets/5b332956-43e2-42a2-a107-99818979ead8" />


## Live Demo

(link later)

## Project Structure

```
app/
  _components/   shared UI components
  _lib/          types, utilities, API wrappers
  _store/        Zustand store
  readings/      reading list, add form, detail pages
  shelves/       shelves grouped by status
```
