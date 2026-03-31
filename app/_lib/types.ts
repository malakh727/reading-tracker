export type ReadingType = "book" | "article" | "other";
export type ReadingStatus = "want-to-read" | "reading" | "finished";

/** Metadata pulled from Open Library and stored alongside the reading. */
export interface OpenLibraryLink {
  olid: string;
  coverUrl: string | null;
  author: string;
  year: number | null;
}

/** A candidate returned by the Open Library search API. */
export interface OpenLibraryCandidate {
  olid: string;
  title: string;
  author: string;
  year: number | null;
  coverUrl: string | null;
}

/** The core entity persisted in localStorage via Zustand. */
export interface Reading {
  id: string;
  type: ReadingType;
  title: string;
  author: string | null;
  status: ReadingStatus;
  url: string | null;
  notes: string | null;
  rating: 1 | 2 | 3 | 4 | 5 | null;
  linkedBook: OpenLibraryLink | null;
  createdAt: string;
  updatedAt: string;
}
