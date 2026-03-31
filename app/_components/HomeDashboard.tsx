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

  const totalHours = readings.reduce((sum, r) => sum + (r.progress?.hoursSpent ?? 0), 0);
  const totalPages = readings.reduce((sum, r) => sum + (r.progress?.pagesRead ?? 0), 0);
  const totalWords = readings.reduce((sum, r) => sum + (r.progress?.wordsRead ?? 0), 0);

  const activity = [
    { label: "Hours Spent", value: totalHours % 1 === 0 ? String(totalHours) : totalHours.toFixed(1), unit: "h" },
    { label: "Pages Read", value: totalPages.toLocaleString(), unit: "pg" },
    { label: "Words Read", value: totalWords >= 1000 ? `${(totalWords / 1000).toFixed(1)}k` : String(totalWords), unit: "w" },
  ];

  const shelves = [
    { label: "Want to Read", status: "want-to-read", emoji: "🌟" },
    { label: "Currently Reading", status: "reading", emoji: "📖" },
    { label: "Finished", status: "finished", emoji: "✅" },
  ] as const;

  return (
    <>
      {/* Reading stats */}
      <section>
        <h2 className="font-heading text-xl font-bold text-text mb-4">Your Stats</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[32px] backdrop-blur-[10px] bg-[rgba(0,26,54,0.6)] border border-[rgba(157,143,255,0.1)] px-6 py-6 text-center shadow-sm"
            >
              <p className="font-heading text-3xl font-bold text-purple">{stat.value}</p>
              <p className="text-xs text-text-sub mt-1.5 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {activity.map((item) => (
            <div
              key={item.label}
              className="rounded-[32px] backdrop-blur-[10px] bg-[rgba(0,26,54,0.6)] border border-[rgba(157,143,255,0.1)] px-6 py-6 text-center shadow-sm"
            >
              <p className="font-heading text-3xl font-bold text-text-accent">
                {item.value}
                <span className="text-base font-normal text-text-muted ml-0.5">{item.unit}</span>
              </p>
              <p className="text-xs text-text-sub mt-1.5 uppercase tracking-wide">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shelf preview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-bold text-text">My Shelves</h2>
          <Link href="/shelves" className="text-sm text-purple hover:text-text-accent transition-colors font-semibold">
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
                className="rounded-[32px] backdrop-blur-[10px] bg-[rgba(0,26,54,0.6)] border border-[rgba(157,143,255,0.1)] px-6 py-6 shadow-sm hover:border-[rgba(157,143,255,0.3)] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[rgba(157,143,255,0.1)] flex items-center justify-center mb-3">
                  <span className="text-lg">{shelf.emoji}</span>
                </div>
                <p className="font-heading font-semibold text-text text-sm">{shelf.label}</p>
                <p className="text-xs text-text-muted mt-1">{count} {count === 1 ? "item" : "items"}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
