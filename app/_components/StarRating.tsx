"use client";

interface StarRatingProps {
  value: number | null;
  onChange?: (rating: 1 | 2 | 3 | 4 | 5) => void;
  readOnly?: boolean;
}

export function StarRating({ value, onChange, readOnly = false }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {([1, 2, 3, 4, 5] as const).map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          className={`text-xl transition-colors ${
            value !== null && star <= value
              ? "text-pink-orchid"
              : "text-gray-300"
          } ${!readOnly ? "hover:text-pink-orchid cursor-pointer" : "cursor-default"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
