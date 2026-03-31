import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-prussian-blue px-6 py-4 shadow-lg">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-electric-sapphire flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:bg-persian-blue transition-colors">
            R
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            Reading<span className="text-wisteria-blue">Tracker</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          <Link
            href="/readings/new"
            className="px-4 py-2 rounded-lg text-sm font-medium text-wisteria-blue hover:text-white hover:bg-space-indigo transition-colors"
          >
            + Add
          </Link>
          <Link
            href="/readings"
            className="px-4 py-2 rounded-lg text-sm font-medium text-wisteria-blue hover:text-white hover:bg-space-indigo transition-colors"
          >
            All Readings
          </Link>
          <Link
            href="/shelves"
            className="px-4 py-2 rounded-lg text-sm font-medium text-wisteria-blue hover:text-white hover:bg-space-indigo transition-colors"
          >
            My Shelves
          </Link>
        </div>
      </div>
    </nav>
  );
}
