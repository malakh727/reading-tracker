"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Reading } from "@/app/_lib/types";
import { now } from "@/app/_lib/utils";

interface ReadingStore {
  readings: Reading[];
  addReading: (reading: Reading) => void;
  updateReading: (id: string, patch: Partial<Omit<Reading, "id" | "createdAt">>) => void;
  removeReading: (id: string) => void;
}

export const useReadingStore = create<ReadingStore>()(
  persist(
    (set) => ({
      readings: [],

      addReading: (reading) =>
        set((s) => ({ readings: [...s.readings, reading] })),

      updateReading: (id, patch) =>
        set((s) => ({
          readings: s.readings.map((r) =>
            r.id === id ? { ...r, ...patch, updatedAt: now() } : r
          ),
        })),

      removeReading: (id) =>
        set((s) => ({ readings: s.readings.filter((r) => r.id !== id) })),
    }),
    { name: "reading-tracker-v1", version: 1 }
  )
);
