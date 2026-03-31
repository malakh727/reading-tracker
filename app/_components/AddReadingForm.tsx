"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookSearchInput } from "./BookSearchInput";
import { StarRating } from "./StarRating";
import { useReadingStore } from "@/app/_store/useReadingStore";
import type {
  ReadingType,
  ReadingStatus,
  OpenLibraryCandidate,
} from "@/app/_lib/types";
import { generateId, now } from "@/app/_lib/utils";

const TYPES: { value: ReadingType; label: string; icon: string }[] = [
  { value: "book", label: "Book", icon: "📘" },
  { value: "article", label: "Article", icon: "📄" },
  { value: "other", label: "Other", icon: "📎" },
];

const STATUSES: { value: ReadingStatus; label: string }[] = [
  { value: "want-to-read", label: "Want to Read" },
  { value: "reading", label: "Reading" },
  { value: "finished", label: "Finished" },
];

export function AddReadingForm() {
  const router = useRouter();
  const { readings, addReading } = useReadingStore();

  const [type, setType] = useState<ReadingType>("book");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<ReadingStatus>("want-to-read");
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [notes, setNotes] = useState("");
  const [linkedBook, setLinkedBook] = useState<OpenLibraryCandidate | null>(null);
  const [dupWarning, setDupWarning] = useState<string | null>(null);

  function handleOLSelect(candidate: OpenLibraryCandidate) {
    setLinkedBook(candidate);
    setTitle(candidate.title);
    setAuthor(candidate.author);
  }

  function checkDuplicate(): string | null {
    if (linkedBook) {
      const dup = readings.find((r) => r.linkedBook?.olid === linkedBook.olid);
      if (dup) return `You already have "${dup.title}" (${dup.status.replace("-", " ")}).`;
    } else if (type === "book" && title.trim()) {
      const dup = readings.find(
        (r) => r.type === "book" && r.title.toLowerCase() === title.trim().toLowerCase()
      );
      if (dup) return `You already have a book titled "${dup.title}".`;
    }
    return null;
  }

  function handleSubmit(e: React.FormEvent, force = false) {
    e.preventDefault();
    if (!title.trim()) return;

    if (!force) {
      const warn = checkDuplicate();
      if (warn) {
        setDupWarning(warn);
        return;
      }
    }

    const id = generateId();
    const ts = now();

    addReading({
      id,
      type,
      title: title.trim(),
      author: author.trim() || null,
      status,
      url: url.trim() || null,
      notes: notes.trim() || null,
      rating,
      linkedBook: linkedBook
        ? {
            olid: linkedBook.olid,
            coverUrl: linkedBook.coverUrl,
            author: linkedBook.author,
            year: linkedBook.year,
          }
        : null,
      progress: null,
      createdAt: ts,
      updatedAt: ts,
    });

    router.push(`/readings/${id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Type picker */}
      <div>
        <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-[2px] mb-2">
          Type
        </label>
        <div className="flex gap-2">
          {TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => {
                setType(t.value);
                setLinkedBook(null);
                setTitle("");
                setAuthor("");
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                type === t.value
                  ? "bg-blue text-white border-blue"
                  : "bg-surface border-border text-text-sub hover:border-purple"
              }`}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-[2px] mb-2">
          Title
        </label>
        {type === "book" ? (
          <BookSearchInput
            value={title}
            onChange={(v) => {
              setTitle(v);
              if (linkedBook && v !== linkedBook.title) setLinkedBook(null);
            }}
            onSelect={handleOLSelect}
          />
        ) : (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full px-5 py-3 rounded-full border border-border bg-[#002041] text-text placeholder-text-muted focus:outline-none focus:border-purple text-sm"
          />
        )}
        {linkedBook && (
          <p className="mt-1.5 text-xs text-purple font-medium">
            ✓ Linked to Open Library record
          </p>
        )}
      </div>

      {/* Author */}
      <div>
        <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-[2px] mb-2">
          Author <span className="normal-case font-normal opacity-60">(optional)</span>
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author name"
          className="w-full px-5 py-3 rounded-full border border-border bg-[#002041] text-text placeholder-text-muted focus:outline-none focus:border-purple text-sm"
        />
      </div>

      {/* URL — for articles/other only */}
      {type !== "book" && (
        <div>
          <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-[2px] mb-2">
            URL <span className="normal-case font-normal opacity-60">(optional)</span>
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://…"
            className="w-full px-5 py-3 rounded-full border border-border bg-[#002041] text-text placeholder-text-muted focus:outline-none focus:border-purple text-sm"
          />
        </div>
      )}

      {/* Status */}
      <div>
        <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-[2px] mb-2">
          Status
        </label>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setStatus(s.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                status === s.value
                  ? "bg-blue text-white border-blue"
                  : "bg-surface border-border text-text-sub hover:border-purple"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-[2px] mb-2">
          Rating <span className="normal-case font-normal opacity-60">(optional)</span>
        </label>
        <StarRating value={rating} onChange={setRating} />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-[2px] mb-2">
          Notes <span className="normal-case font-normal opacity-60">(optional)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Your thoughts…"
          rows={3}
          className="w-full px-5 py-3 rounded-[12px] border border-border bg-[#002041] text-text placeholder-text-muted focus:outline-none focus:border-purple text-sm resize-none"
        />
      </div>

      {/* Duplicate warning */}
      {dupWarning && (
        <div className="rounded-[20px] bg-[rgba(138,22,50,0.2)] border border-[rgba(253,111,133,0.2)] p-4 text-sm text-[#c8475d]">
          <p className="font-semibold mb-2">⚠️ Possible duplicate</p>
          <p className="mb-3">{dupWarning}</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
              className="px-4 py-1.5 rounded-full bg-blue text-white text-xs font-medium hover:opacity-90 transition-opacity"
            >
              Add anyway
            </button>
            <button
              type="button"
              onClick={() => setDupWarning(null)}
              className="px-4 py-1.5 rounded-full border border-border text-text-sub text-xs font-medium hover:border-purple transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Submit */}
      {!dupWarning && (
        <button
          type="submit"
          disabled={!title.trim()}
          className="w-full py-3 rounded-full bg-blue hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity text-white font-bold text-sm shadow-[0px_10px_30px_0px_rgba(76,54,190,0.4)]"
        >
          Add Reading
        </button>
      )}
    </form>
  );
}
