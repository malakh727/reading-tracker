import { AddReadingForm } from "@/app/_components/AddReadingForm";

export default function AddReadingPage() {
  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-5xl font-bold text-text tracking-[-3px] mb-1">Add a Reading</h1>
      <p className="text-text-info text-sm mb-8">
        Track a book, article, or anything you&apos;re reading.
      </p>
      <div className="rounded-[32px] bg-surface shadow-[0px_30px_60px_0px_rgba(0,0,0,0.5)] p-8">
        <AddReadingForm />
      </div>
    </div>
  );
}
