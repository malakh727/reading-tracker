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

  return (
    <Link
      href={`/readings/${reading.id}`}
      className="flex gap-4 rounded-xl bg-white border border-wisteria-blue/20 p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Cover / icon */}
      <div className="shrink-0 w-14 h-20 rounded-lg bg-space-indigo flex items-center justify-center overflow-hidden">
        {cover ? (
          <Image src={cover} alt={reading.title} width={56} height={80} className="object-cover w-full h-full" />
        ) : (
          <span className="text-2xl">{typeIcon[reading.type]}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 min-w-0">
        <p className="text-xs font-semibold text-electric-sapphire uppercase tracking-widest">
          {typeLabel[reading.type]}
        </p>
        <p className="font-semibold text-prussian-blue text-sm leading-snug line-clamp-2">
          {reading.title}
        </p>
        {reading.author && (
          <p className="text-xs text-space-indigo/60">{reading.author}</p>
        )}
        <div className="mt-auto">
          <StatusBadge status={reading.status} />
        </div>
      </div>
    </Link>
  );
}
