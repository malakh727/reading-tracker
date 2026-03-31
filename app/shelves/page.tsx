"use client";

import Link from "next/link";
import { useReadingStore } from "@/app/_store/useReadingStore";
import { ReadingCard } from "@/app/_components/ReadingCard";
import type { ReadingStatus } from "@/app/_lib/types";

const SHELVES: { status: ReadingStatus; label: string; emoji: string; color: string }[] = [
  { status: "want-to-read", label: "Want to Read", emoji: "🌟", color: "bg-electric-sapphire/10 text-electric-sapphire" },
  { status: "reading", label: "Currently Reading", emoji: "📖", color: "bg-lavender-purple/10 text-lavender-purple" },
  { status: "finished", label: "Finished", emoji: "✅", color: "bg-persian-blue/10 text-persian-blue" },
];

export default function ShelvesPage() {
  const readings = useReadingStore((s) => s.readings);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-bold text-prussian-blue">My Shelves</h1>
        <p className="text-space-indigo/60 text-sm mt-1">Your readings organized by status.</p>
      </div>

      {SHELVES.map((shelf) => {
        const items = readings.filter((r) => r.status === shelf.status);
        return (
          <section key={shelf.status}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-9 h-9 rounded-xl ${shelf.color} flex items-center justify-center text-lg`}>
                {shelf.emoji}
              </div>
              <h2 className="font-semibold text-prussian-blue">{shelf.label}</h2>
              <span className="text-xs text-space-indigo/50 font-medium">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>

            {items.length === 0 ? (
              <div className="rounded-xl border border-dashed border-wisteria-blue/30 py-8 text-center text-sm text-space-indigo/40">
                Nothing here yet.{" "}
                <Link href="/readings/new" className="text-electric-sapphire hover:text-persian-blue">
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
