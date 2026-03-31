import Link from "next/link";
import { ClientOnly } from "./_components/ClientOnly";
import { HomeDashboard } from "./_components/HomeDashboard";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Hero */}
      <section className="rounded-2xl bg-space-indigo px-8 py-14 text-center shadow-xl overflow-hidden relative">
        <div className="absolute -top-10 -left-10 w-52 h-52 rounded-full bg-persian-blue opacity-30 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-blue-violet opacity-20 blur-3xl" />

        <div className="relative">
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-electric-sapphire/20 text-wisteria-blue text-xs font-semibold tracking-widest uppercase">
            Your Reading Universe
          </span>
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Track every read.<br />
            <span className="text-wisteria-blue">Own your story.</span>
          </h1>
          <p className="text-wisteria-blue/80 text-base max-w-md mx-auto mb-8">
            Books, articles, or anything else — log what you read, link books to real records, and manage your shelves.
          </p>
          <Link
            href="/readings/new"
            className="inline-block px-7 py-3 rounded-xl bg-electric-sapphire hover:bg-persian-blue transition-colors text-white font-semibold text-sm"
          >
            + Add a Reading
          </Link>
        </div>
      </section>

      {/* Live stats + shelf preview from store */}
      <ClientOnly>
        <HomeDashboard />
      </ClientOnly>
    </div>
  );
}
