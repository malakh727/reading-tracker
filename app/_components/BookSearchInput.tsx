"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { searchOpenLibrary } from "@/app/_lib/openLibrary";
import type { OpenLibraryCandidate } from "@/app/_lib/types";

interface BookSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (candidate: OpenLibraryCandidate) => void;
}

export function BookSearchInput({ value, onChange, onSelect }: BookSearchInputProps) {
  const [candidates, setCandidates] = useState<OpenLibraryCandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length < 2) {
      setCandidates([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const results = await searchOpenLibrary(value);
      setCandidates(results);
      setOpen(true);
      setLoading(false);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(candidate: OpenLibraryCandidate) {
    onSelect(candidate);
    onChange(candidate.title);
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search title, author…"
        className="w-full px-5 py-3 rounded-full border border-border bg-[#002041] text-text placeholder-text-muted focus:outline-none focus:border-purple text-sm"
      />
      {loading && (
        <span className="absolute right-4 top-3.5 text-xs text-text-muted">
          Searching…
        </span>
      )}

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-[20px] border border-border bg-surface shadow-[0px_20px_40px_0px_rgba(0,0,0,0.4)] overflow-hidden">
          {candidates.length === 0 ? (
            <p className="px-5 py-4 text-sm text-text-muted">
              No matches — you can still add manually.
            </p>
          ) : (
            candidates.map((c) => (
              <button
                key={c.olid}
                type="button"
                onClick={() => handleSelect(c)}
                className="flex items-center gap-4 w-full px-5 py-3 hover:bg-[rgba(157,143,255,0.08)] transition-colors text-left border-b border-[rgba(42,73,113,0.2)] last:border-0"
              >
                <div className="shrink-0 w-8 h-12 rounded-[6px] bg-surface-indigo flex items-center justify-center overflow-hidden">
                  {c.coverUrl ? (
                    <Image src={c.coverUrl} alt={c.title} width={32} height={48} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-base">📘</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text truncate">{c.title}</p>
                  <p className="text-xs text-text-muted">
                    {c.author}{c.year ? ` · ${c.year}` : ""}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
