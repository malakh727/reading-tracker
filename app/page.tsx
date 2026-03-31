import Link from "next/link";
import { ClientOnly } from "./_components/ClientOnly";
import { HomeDashboard } from "./_components/HomeDashboard";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Hero */}
      <section className="relative rounded-[32px] overflow-hidden px-10 py-16"
        style={{ background: "linear-gradient(135deg, rgba(76,54,190,0.2) 0%, rgba(157,143,255,0.05) 50%, rgba(223,183,255,0.1) 100%), #001a36" }}>
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-blue opacity-10 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-purple opacity-10 blur-[80px] pointer-events-none" />

        <div className="relative">
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[rgba(157,143,255,0.1)] text-purple text-xs font-semibold tracking-widest uppercase border border-[rgba(157,143,255,0.2)]">
            Your Reading Universe
          </span>
          <h1 className="font-heading text-5xl font-bold text-text tracking-[-2px] mb-4 leading-tight">
            Track every read.<br />
            <span className="text-text-accent">Own your story.</span>
          </h1>
          <p className="text-text-sub text-base max-w-md mb-8 leading-relaxed">
            Books, articles, or anything else — log what you read, link books to real records, and manage your shelves.
          </p>
          <Link
            href="/readings/new"
            className="inline-block px-8 py-3.5 rounded-full bg-blue hover:opacity-90 transition-opacity text-white font-bold text-sm shadow-[0px_10px_30px_0px_rgba(76,54,190,0.4)]"
          >
            + Add a Reading
          </Link>
        </div>
      </section>

      {/* Live stats + shelf preview */}
      <ClientOnly>
        <HomeDashboard />
      </ClientOnly>
    </div>
  );
}
