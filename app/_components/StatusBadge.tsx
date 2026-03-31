import type { ReadingStatus } from "@/app/_lib/types";

const config: Record<ReadingStatus, { label: string; className: string }> = {
  "want-to-read": {
    label: "Want to Read",
    className: "bg-electric-sapphire/10 text-electric-sapphire",
  },
  reading: {
    label: "Reading",
    className: "bg-lavender-purple/10 text-lavender-purple",
  },
  finished: {
    label: "Finished",
    className: "bg-persian-blue/10 text-persian-blue",
  },
};

export function StatusBadge({ status }: { status: ReadingStatus }) {
  const { label, className } = config[status];
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}
