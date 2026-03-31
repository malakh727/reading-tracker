"use client";

import Link from "next/link";
import { useReadingStore } from "@/app/_store/useReadingStore";

export function HomeDashboard() {
  const readings = useReadingStore((s) => s.readings);

  const stats = [
    { label: "Total Readings", value: readings.length },
    { label: "Currently Reading", value: readings.filter((r) => r.status === "reading").length },
    { label: "Finished", value: readings.filter((r) => r.status === "finished").length },
  ];

  const shelves = [
    { label: "Want to Read", status: "want-to-read", emoji: "🌟" },
    { label: "Currently Reading", status: "reading", emoji: "📖" },
    { label: "Finished", status: "finished", emoji: "✅" },
  ] as const;

  return (
    <>
      {/* Stats */}
      <section className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-white border border-wisteria-blue/20 px-6 py-5 text-center shadow-sm"
          >
            <p className="text-3xl font-bold text-persian-blue">{stat.value}</p>
            <p className="text-sm text-space-indigo/60 mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Shelf preview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-space-indigo">My Shelves</h2>
          <Link href="/shelves" className="text-sm text-electric-sapphire hover:text-persian-blue transition-colors font-medium">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {shelves.map((shelf) => {
            const count = readings.filter((r) => r.status === shelf.status).length;
            return (
              <Link
                key={shelf.status}
                href="/shelves"
                className="rounded-xl bg-white border border-wisteria-blue/20 px-5 py-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-9 h-9 rounded-lg bg-lavender-purple/15 flex items-center justify-center mb-3">
                  <span className="text-lg">{shelf.emoji}</span>
                </div>
                <p className="font-medium text-prussian-blue text-sm">{shelf.label}</p>
                <p className="text-xs text-space-indigo/50 mt-1">{count} {count === 1 ? "item" : "items"}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
