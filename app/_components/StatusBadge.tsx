import type { ReadingStatus } from "@/app/_lib/types";

const config: Record<ReadingStatus, { label: string; className: string }> = {
  "want-to-read": {
    label: "Want to Read",
    className: "bg-[rgba(157,143,255,0.15)] text-purple border border-[rgba(157,143,255,0.3)]",
  },
  reading: {
    label: "Reading",
    className: "bg-[rgba(223,183,255,0.15)] text-text-accent border border-[rgba(223,183,255,0.3)]",
  },
  finished: {
    label: "Finished",
    className: "bg-[rgba(76,54,190,0.2)] text-purple border border-[rgba(157,143,255,0.2)]",
  },
};

export function StatusBadge({ status }: { status: ReadingStatus }) {
  const { label, className } = config[status];
  return (
    <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold tracking-[0.5px] uppercase ${className}`}>
      {label}
    </span>
  );
}
