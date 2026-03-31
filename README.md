# 📖 Reading Tracker

A modern reading tracker for books, articles, and more — built with Next.js.

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

(added later)

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
