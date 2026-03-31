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
        <p className="text-space-indigo/60">Reading not found.</p>
        <Link href="/readings" className="mt-4 inline-block text-electric-sapphire text-sm hover:text-persian-blue">
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
      <Link href="/readings" className="text-sm text-electric-sapphire hover:text-persian-blue transition-colors w-fit">
        ← All Readings
      </Link>

      {/* Header card */}
      <div className="rounded-2xl bg-white border border-wisteria-blue/20 p-8 shadow-sm">
        <div className="flex gap-6">
          {/* Cover */}
          <div className="shrink-0 w-28 h-40 rounded-xl bg-space-indigo flex items-center justify-center overflow-hidden shadow-lg">
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
            <p className="text-xs font-semibold text-electric-sapphire uppercase tracking-widest">
              {typeLabel[reading.type]}
              {reading.linkedBook?.year ? ` · ${reading.linkedBook.year}` : ""}
            </p>
            <h1 className="text-xl font-bold text-prussian-blue leading-snug">{reading.title}</h1>
            {reading.author && (
              <p className="text-sm text-space-indigo/60">{reading.author}</p>
            )}
            {reading.url && (
              <a
                href={reading.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-electric-sapphire hover:text-persian-blue truncate"
              >
                {reading.url}
              </a>
            )}
            <div className="mt-1">
              <StatusBadge status={reading.status} />
            </div>
            {reading.linkedBook && (
              <p className="text-xs text-persian-blue font-medium mt-1">✓ Linked to Open Library</p>
            )}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="rounded-xl bg-white border border-wisteria-blue/20 p-6 shadow-sm">
        <p className="text-xs font-semibold text-space-indigo/70 uppercase tracking-widest mb-3">Status</p>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => updateReading(id, { status: s.value })}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                reading.status === s.value
                  ? "bg-persian-blue text-white border-persian-blue"
                  : "bg-white text-space-indigo border-wisteria-blue/30 hover:border-persian-blue"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="rounded-xl bg-white border border-wisteria-blue/20 p-6 shadow-sm">
        <p className="text-xs font-semibold text-space-indigo/70 uppercase tracking-widest mb-3">Rating</p>
        <StarRating
          value={reading.rating}
          onChange={(r) => updateReading(id, { rating: r })}
        />
      </div>

      {/* Notes */}
      <div className="rounded-xl bg-white border border-wisteria-blue/20 p-6 shadow-sm">
        <p className="text-xs font-semibold text-space-indigo/70 uppercase tracking-widest mb-3">Notes</p>
        <textarea
          defaultValue={reading.notes ?? ""}
          onBlur={(e) => updateReading(id, { notes: e.target.value || null })}
          placeholder="Your thoughts on this reading…"
          rows={4}
          className="w-full px-4 py-2.5 rounded-xl border border-wisteria-blue/30 bg-gray-50 text-prussian-blue placeholder-space-indigo/40 focus:outline-none focus:border-electric-sapphire text-sm resize-none"
        />
      </div>

      {/* Progress */}
      <div className="rounded-xl bg-white border border-wisteria-blue/20 p-6 shadow-sm">
        <p className="text-xs font-semibold text-space-indigo/70 uppercase tracking-widest mb-4">Progress</p>

        {/* Progress bar — books only, shown when totalPages is set */}
        {reading.type === "book" && (reading.progress?.totalPages ?? 0) > 0 && (
          <div className="mb-5">
            <div className="flex justify-between text-xs text-space-indigo/60 mb-1.5">
              <span>{reading.progress?.pagesRead ?? 0} / {reading.progress?.totalPages} pages</span>
              <span>{Math.min(100, Math.round(((reading.progress?.pagesRead ?? 0) / (reading.progress!.totalPages!)) * 100))}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-wisteria-blue/20">
              <div
                className="h-2.5 rounded-full bg-persian-blue transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round(((reading.progress?.pagesRead ?? 0) / (reading.progress!.totalPages!)) * 100))}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {reading.type === "book" && (
            <>
              <div>
                <label className="block text-xs text-space-indigo/60 mb-1.5">Pages Read</label>
                <input
                  type="number"
                  min={0}
                  defaultValue={reading.progress?.pagesRead ?? ""}
                  onBlur={(e) => updateProgress("pagesRead", e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 rounded-xl border border-wisteria-blue/30 bg-gray-50 text-prussian-blue text-sm focus:outline-none focus:border-electric-sapphire"
                />
              </div>
              <div>
                <label className="block text-xs text-space-indigo/60 mb-1.5">Total Pages</label>
                <input
                  type="number"
                  min={0}
                  defaultValue={reading.progress?.totalPages ?? ""}
                  onBlur={(e) => updateProgress("totalPages", e.target.value)}
                  placeholder="e.g. 320"
                  className="w-full px-3 py-2 rounded-xl border border-wisteria-blue/30 bg-gray-50 text-prussian-blue text-sm focus:outline-none focus:border-electric-sapphire"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-xs text-space-indigo/60 mb-1.5">Words Read</label>
            <input
              type="number"
              min={0}
              defaultValue={reading.progress?.wordsRead ?? ""}
              onBlur={(e) => updateProgress("wordsRead", e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 rounded-xl border border-wisteria-blue/30 bg-gray-50 text-prussian-blue text-sm focus:outline-none focus:border-electric-sapphire"
            />
          </div>
          <div>
            <label className="block text-xs text-space-indigo/60 mb-1.5">Hours Spent</label>
            <input
              type="number"
              min={0}
              step={0.5}
              defaultValue={reading.progress?.hoursSpent ?? ""}
              onBlur={(e) => updateProgress("hoursSpent", e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 rounded-xl border border-wisteria-blue/30 bg-gray-50 text-prussian-blue text-sm focus:outline-none focus:border-electric-sapphire"
            />
          </div>
        </div>
      </div>

      {/* Delete */}
      <button
        onClick={handleDelete}
        className="w-fit px-4 py-2 rounded-xl border border-pink-orchid/40 text-pink-orchid/80 hover:bg-pink-orchid/10 text-sm transition-colors"
      >
        Delete reading
      </button>
    </div>
  );
}
