"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReadingStore } from "@/app/_store/useReadingStore";
import { StarRating } from "@/app/_components/StarRating";
import { StatusBadge } from "@/app/_components/StatusBadge";
import type { ReadingProgress, ReadingStatus, ReadingType } from "@/app/_lib/types";

const typeLabel: Record<ReadingType, string> = {
  book: "Book",
  article: "Article",
  other: "Other",
};

const STATUSES: { value: ReadingStatus; label: string }[] = [
  { value: "want-to-read", label: "Want to Read" },
  { value: "reading", label: "Reading" },
  { value: "finished", label: "Finished" },
];

export default function ReadingDetailPage(props: PageProps<"/readings/[id]">) {
  const { id } = use(props.params);
  const router = useRouter();
  const { readings, updateReading, removeReading } = useReadingStore();
  const reading = readings.find((r) => r.id === id);

  if (!reading) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl mb-2">🔍</p>
        <p className="text-text-muted">Reading not found.</p>
        <Link href="/readings" className="mt-4 inline-block text-purple text-sm hover:text-text-accent">
          ← Back to all readings
        </Link>
      </div>
    );
  }

  const cover = reading.linkedBook?.coverUrl;

  function updateProgress(field: keyof ReadingProgress, raw: string) {
    const value = raw !== "" ? Number(raw) : null;
    const existing = reading!.progress;
    updateReading(id, {
      progress: {
        pagesRead: existing?.pagesRead ?? null,
        totalPages: existing?.totalPages ?? null,
        wordsRead: existing?.wordsRead ?? null,
        hoursSpent: existing?.hoursSpent ?? null,
        [field]: value,
      },
    });
  }

  function handleDelete() {
    if (confirm("Delete this reading?")) {
      removeReading(id);
      router.push("/readings");
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <Link href="/readings" className="text-sm text-purple hover:text-text-accent transition-colors uppercase tracking-[1.2px] w-fit">
        ← All Readings
      </Link>

      {/* Header card */}
      <div className="rounded-[32px] backdrop-blur-[12px] bg-[rgba(0,26,54,0.6)] border border-[rgba(157,143,255,0.1)] p-8">
        <div className="flex gap-6">
          {/* Cover */}
          <div className="shrink-0 w-28 h-40 rounded-[8px] bg-surface flex items-center justify-center overflow-hidden shadow-lg">
            {cover ? (
              <Image src={cover} alt={reading.title} width={112} height={160} className="object-cover w-full h-full" />
            ) : (
              <span className="text-4xl">
                {reading.type === "book" ? "📘" : reading.type === "article" ? "📄" : "📎"}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2 min-w-0">
            <p className="text-xs font-semibold text-text-accent uppercase tracking-widest">
              {typeLabel[reading.type]}
              {reading.linkedBook?.year ? ` · ${reading.linkedBook.year}` : ""}
            </p>
            <h1 className="font-heading text-2xl font-bold text-text leading-snug">{reading.title}</h1>
            {reading.author && (
              <p className="text-sm text-text-sub">{reading.author}</p>
            )}
            {reading.url && (
              <a
                href={reading.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple hover:text-text-accent truncate"
              >
                {reading.url}
              </a>
            )}
            <div className="mt-1">
              <StatusBadge status={reading.status} />
            </div>
            {reading.linkedBook && (
              <p className="text-xs text-purple font-medium mt-1">✓ Linked to Open Library</p>
            )}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="rounded-[32px] backdrop-blur-[12px] bg-[rgba(0,26,54,0.6)] border border-[rgba(157,143,255,0.1)] p-6">
        <p className="text-[10px] font-semibold text-text-muted uppercase tracking-[2px] mb-3">Status</p>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => updateReading(id, { status: s.value })}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                reading.status === s.value
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
      <div className="rounded-[32px] backdrop-blur-[12px] bg-[rgba(0,26,54,0.6)] border border-[rgba(157,143,255,0.1)] p-6">
        <p className="text-[10px] font-semibold text-text-muted uppercase tracking-[2px] mb-3">Rating</p>
        <StarRating
          value={reading.rating}
          onChange={(r) => updateReading(id, { rating: r })}
        />
      </div>

      {/* Notes */}
      <div className="rounded-[32px] backdrop-blur-[12px] bg-[rgba(0,26,54,0.6)] border border-[rgba(157,143,255,0.1)] p-6">
        <p className="text-[10px] font-semibold text-text-muted uppercase tracking-[2px] mb-3">Notes</p>
        <textarea
          defaultValue={reading.notes ?? ""}
          onBlur={(e) => updateReading(id, { notes: e.target.value || null })}
          placeholder="Your thoughts on this reading…"
          rows={4}
          className="w-full px-4 py-2.5 bg-[rgba(0,14,34,0.5)] border-0 text-text-sub focus:outline-none text-sm resize-none rounded-[20px] placeholder-text-muted"
        />
      </div>

      {/* Progress */}
      <div className="rounded-[32px] backdrop-blur-[12px] bg-[rgba(0,26,54,0.6)] border border-[rgba(157,143,255,0.1)] p-6">
        <p className="text-[10px] font-semibold text-text-muted uppercase tracking-[2px] mb-4">Progress</p>

        {/* Progress bar — books only, shown when totalPages is set */}
        {reading.type === "book" && (reading.progress?.totalPages ?? 0) > 0 && (
          <div className="mb-5">
            <div className="flex justify-between text-xs text-text-muted mb-1.5">
              <span>{reading.progress?.pagesRead ?? 0} / {reading.progress?.totalPages} pages</span>
              <span className="text-text">{Math.min(100, Math.round(((reading.progress?.pagesRead ?? 0) / (reading.progress!.totalPages!)) * 100))}%</span>
            </div>
            <div className="w-full h-[6px] rounded-full bg-track overflow-hidden">
              <div
                className="h-full rounded-full shadow-[0px_0px_10px_0px_rgba(223,183,255,0.4)] transition-all duration-300"
                style={{
                  width: `${Math.min(100, Math.round(((reading.progress?.pagesRead ?? 0) / (reading.progress!.totalPages!)) * 100))}%`,
                  background: "linear-gradient(to right, #9d8fff, #dfb7ff)",
                }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {reading.type === "book" && (
            <>
              <div className="rounded-[32px] bg-[rgba(0,38,76,0.4)] p-4">
                <label className="block text-xs text-text-muted mb-1.5">Pages Read</label>
                <input
                  type="number"
                  min={0}
                  defaultValue={reading.progress?.pagesRead ?? ""}
                  onBlur={(e) => updateProgress("pagesRead", e.target.value)}
                  placeholder="0"
                  className="w-full bg-transparent text-text text-sm focus:outline-none placeholder-text-muted"
                />
              </div>
              <div className="rounded-[32px] bg-[rgba(0,38,76,0.4)] p-4">
                <label className="block text-xs text-text-muted mb-1.5">Total Pages</label>
                <input
                  type="number"
                  min={0}
                  defaultValue={reading.progress?.totalPages ?? ""}
                  onBlur={(e) => updateProgress("totalPages", e.target.value)}
                  placeholder="e.g. 320"
                  className="w-full bg-transparent text-text text-sm focus:outline-none placeholder-text-muted"
                />
              </div>
            </>
          )}
          <div className="rounded-[32px] bg-[rgba(0,38,76,0.4)] p-4">
            <label className="block text-xs text-text-muted mb-1.5">Words Read</label>
            <input
              type="number"
              min={0}
              defaultValue={reading.progress?.wordsRead ?? ""}
              onBlur={(e) => updateProgress("wordsRead", e.target.value)}
              placeholder="0"
              className="w-full bg-transparent text-text text-sm focus:outline-none placeholder-text-muted"
            />
          </div>
          <div className="rounded-[32px] bg-[rgba(0,38,76,0.4)] p-4">
            <label className="block text-xs text-text-muted mb-1.5">Hours Spent</label>
            <input
              type="number"
              min={0}
              step={0.5}
              defaultValue={reading.progress?.hoursSpent ?? ""}
              onBlur={(e) => updateProgress("hoursSpent", e.target.value)}
              placeholder="0"
              className="w-full bg-transparent text-text text-sm focus:outline-none placeholder-text-muted"
            />
          </div>
        </div>
      </div>

      {/* Delete */}
      <button
        onClick={handleDelete}
        className="w-fit px-4 py-2 rounded-full border border-[rgba(253,111,133,0.3)] text-[#c8475d]/80 hover:bg-[rgba(138,22,50,0.2)] text-sm transition-colors"
      >
        Delete reading
      </button>
    </div>
  );
}
