"use client";

import { useState } from "react";
import Link from "next/link";
import { useReadingStore } from "@/app/_store/useReadingStore";
import { ReadingCard } from "@/app/_components/ReadingCard";
import type { ReadingType, ReadingStatus } from "@/app/_lib/types";

const TYPE_FILTERS: { value: ReadingType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "book", label: "Books" },
  { value: "article", label: "Articles" },
  { value: "other", label: "Other" },
];

const STATUS_FILTERS: { value: ReadingStatus | "all"; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "want-to-read", label: "Want to Read" },
  { value: "reading", label: "Reading" },
  { value: "finished", label: "Finished" },
];

export default function ReadingsPage() {
  const readings = useReadingStore((s) => s.readings);
  const [typeFilter, setTypeFilter] = useState<ReadingType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ReadingStatus | "all">("all");

  const filtered = readings.filter((r) => {
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-prussian-blue">All Readings</h1>
          <p className="text-space-indigo/60 text-sm mt-1">{readings.length} total</p>
        </div>
        <Link
          href="/readings/new"
          className="px-5 py-2.5 rounded-xl bg-electric-sapphire hover:bg-persian-blue transition-colors text-white text-sm font-semibold"
        >
          + Add Reading
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setTypeFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                typeFilter === f.value
                  ? "bg-electric-sapphire text-white border-electric-sapphire"
                  : "bg-white text-space-indigo border-wisteria-blue/30 hover:border-electric-sapphire"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                statusFilter === f.value
                  ? "bg-persian-blue text-white border-persian-blue"
                  : "bg-white text-space-indigo border-wisteria-blue/30 hover:border-persian-blue"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-white border border-wisteria-blue/20">
          <p className="text-3xl mb-3">📭</p>
          <p className="text-space-indigo/60 text-sm mb-4">No readings found.</p>
          <Link
            href="/readings/new"
            className="text-electric-sapphire text-sm hover:text-persian-blue font-medium"
          >
            Add your first reading →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <ReadingCard key={r.id} reading={r} />
          ))}
        </div>
      )}
    </div>
  );
}
