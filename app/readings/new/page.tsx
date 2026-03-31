import { AddReadingForm } from "@/app/_components/AddReadingForm";

export default function AddReadingPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-prussian-blue mb-1">Add a Reading</h1>
      <p className="text-space-indigo/60 text-sm mb-8">
        Track a book, article, or anything you&apos;re reading.
      </p>
      <div className="rounded-2xl bg-white border border-wisteria-blue/20 p-8 shadow-sm">
        <AddReadingForm />
      </div>
    </div>
  );
}
