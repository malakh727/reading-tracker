"use client";

interface StarRatingProps {
  value: number | null;
  onChange?: (rating: 1 | 2 | 3 | 4 | 5) => void;
  readOnly?: boolean;
}

export function StarRating({ value, onChange, readOnly = false }: StarRatingProps) {
  return (
    <div className="flex gap-1 p-3 rounded-full bg-[rgba(0,26,54,0.4)] w-fit">
      {([1, 2, 3, 4, 5] as const).map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          className={`text-xl transition-colors ${
            value !== null && star <= value
              ? "text-text-accent"
              : "text-text-muted/40"
          } ${!readOnly ? "hover:text-text-accent cursor-pointer" : "cursor-default"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
