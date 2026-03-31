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

  // Close dropdown on outside click
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
        placeholder="Type a book title…"
        className="w-full px-4 py-2.5 rounded-xl border border-wisteria-blue/30 bg-white text-prussian-blue placeholder-space-indigo/40 focus:outline-none focus:border-electric-sapphire text-sm"
      />
      {loading && (
        <span className="absolute right-3 top-3 text-xs text-space-indigo/40">
          Searching…
        </span>
      )}

      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-xl border border-wisteria-blue/20 bg-white shadow-lg overflow-hidden">
          {candidates.length === 0 ? (
            <p className="px-4 py-3 text-sm text-space-indigo/50">
              No matches found — you can still add manually below.
            </p>
          ) : (
            candidates.map((c) => (
              <button
                key={c.olid}
                type="button"
                onClick={() => handleSelect(c)}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-wisteria-blue/10 transition-colors text-left"
              >
                <div className="shrink-0 w-8 h-12 rounded bg-space-indigo flex items-center justify-center overflow-hidden">
                  {c.coverUrl ? (
                    <Image src={c.coverUrl} alt={c.title} width={32} height={48} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-base">📘</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-prussian-blue truncate">{c.title}</p>
                  <p className="text-xs text-space-indigo/60">
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
