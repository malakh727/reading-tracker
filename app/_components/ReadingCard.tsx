import Link from "next/link";
import Image from "next/image";
import type { Reading, ReadingType } from "@/app/_lib/types";
import { StatusBadge } from "./StatusBadge";

const typeIcon: Record<ReadingType, string> = {
  book: "📘",
  article: "📄",
  other: "📎",
};

const typeLabel: Record<ReadingType, string> = {
  book: "Book",
  article: "Article",
  other: "Other",
};

export function ReadingCard({ reading }: { reading: Reading }) {
  const cover = reading.linkedBook?.coverUrl;
  const pagesRead = reading.progress?.pagesRead ?? 0;
  const totalPages = reading.progress?.totalPages ?? 0;
  const pct = totalPages > 0 ? Math.min(100, Math.round((pagesRead / totalPages) * 100)) : null;

  return (
    <Link
      href={`/readings/${reading.id}`}
      className="flex gap-5 rounded-[32px] bg-surface-indigo p-6 hover:opacity-90 transition-opacity"
    >
      {/* Cover / icon */}
      <div className="shrink-0 w-16 h-24 rounded-[8px] bg-surface flex items-center justify-center overflow-hidden shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
        {cover ? (
          <Image src={cover} alt={reading.title} width={64} height={96} className="object-cover w-full h-full" />
        ) : (
          <span className="text-2xl">{typeIcon[reading.type]}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 min-w-0 flex-1 py-1">
        <p className="text-[10px] font-semibold text-text-accent uppercase tracking-[1px]">
          {typeLabel[reading.type]}
        </p>
        <p className="font-heading font-bold text-text text-base leading-snug line-clamp-2">
          {reading.title}
        </p>
        {reading.author && (
          <p className="text-xs text-text-sub">{reading.author}</p>
        )}
        <div className="mt-auto pt-2">
          <StatusBadge status={reading.status} />
        </div>
        {pct !== null && (
          <div className="mt-2">
            <div className="flex justify-between text-[10px] text-text-muted mb-1">
              <span>Progress</span>
              <span className="text-text">{pct}%</span>
            </div>
            <div className="h-[6px] rounded-full bg-track overflow-hidden">
              <div
                className="h-full rounded-full shadow-[0px_0px_10px_0px_rgba(223,183,255,0.4)]"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(to right, #9d8fff, #dfb7ff)",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
