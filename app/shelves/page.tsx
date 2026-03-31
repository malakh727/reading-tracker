"use client";

import Link from "next/link";
import { useReadingStore } from "@/app/_store/useReadingStore";
import { ReadingCard } from "@/app/_components/ReadingCard";
import type { ReadingStatus } from "@/app/_lib/types";

const SHELVES: { status: ReadingStatus; label: string; emoji: string }[] = [
  { status: "want-to-read", label: "Want to Read", emoji: "🌟" },
  { status: "reading", label: "Currently Reading", emoji: "📖" },
  { status: "finished", label: "Finished", emoji: "✅" },
];

export default function ShelvesPage() {
  const readings = useReadingStore((s) => s.readings);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-heading text-3xl font-bold text-text tracking-[-1.5px]">My Shelves</h1>
        <p className="text-text-muted text-sm mt-1">Your readings organized by status.</p>
      </div>

      {SHELVES.map((shelf) => {
        const items = readings.filter((r) => r.status === shelf.status);
        return (
          <section key={shelf.status}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[rgba(157,143,255,0.1)] flex items-center justify-center text-lg">
                {shelf.emoji}
              </div>
              <h2 className="font-semibold text-text">{shelf.label}</h2>
              <span className="text-xs text-text-muted font-medium">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>

            {items.length === 0 ? (
              <div className="rounded-[32px] border-2 border-dashed border-[rgba(42,73,113,0.3)] py-10 text-center text-text-muted">
                Nothing here yet.{" "}
                <Link href="/readings/new" className="text-purple hover:text-text-accent">
                  Add one →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((r) => (
                  <ReadingCard key={r.id} reading={r} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
