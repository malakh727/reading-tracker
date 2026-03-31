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
          <h1 className="font-heading text-3xl font-bold text-text tracking-[-1.5px]">All Readings</h1>
          <p className="text-text-muted text-sm mt-1">{readings.length} total</p>
        </div>
        <Link
          href="/readings/new"
          className="px-6 py-2.5 rounded-full bg-blue text-white text-sm font-bold shadow-[0px_10px_30px_0px_rgba(76,54,190,0.4)] hover:opacity-90 transition-opacity"
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
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                typeFilter === f.value
                  ? "bg-[#9d8fff] text-[#1c0071] font-bold border-[#9d8fff]"
                  : "bg-surface-2 border-border text-text-sub hover:border-purple"
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
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                statusFilter === f.value
                  ? "bg-[#9d8fff] text-[#1c0071] font-bold border-[#9d8fff]"
                  : "bg-surface-2 border-border text-text-sub hover:border-purple"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="rounded-[32px] bg-surface border border-[rgba(42,73,113,0.3)] py-20 text-center">
          <p className="text-3xl mb-3">📭</p>
          <p className="text-text-muted text-sm mb-4">No readings found.</p>
          <Link
            href="/readings/new"
            className="text-purple text-sm hover:text-text-accent font-medium"
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
