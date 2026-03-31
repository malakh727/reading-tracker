"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/readings", label: "All Readings" },
  { href: "/shelves", label: "My Shelves" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-72 z-40 flex flex-col py-8 backdrop-blur-[20px] bg-[rgba(0,26,54,0.6)] border-r border-[rgba(157,143,255,0.15)] shadow-[10px_0px_30px_0px_rgba(0,0,0,0.3)] rounded-br-[32px] rounded-tr-[32px]">
      {/* Brand */}
      <div className="px-8 pb-12">
        <Link href="/">
          <p className="font-heading text-xl font-semibold text-purple">
            ReadingTracker
          </p>
          <p className="text-[10px] text-text-muted uppercase tracking-widest mt-0.5 font-semibold">
            Celestial Reader
          </p>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 flex flex-col">
        {NAV_LINKS.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 py-4 text-sm font-semibold uppercase tracking-[0.35px] transition-all ${
                isActive
                  ? "pl-7 pr-6 border-l-4 border-purple bg-gradient-to-r from-[rgba(157,143,255,0.2)] to-[rgba(157,143,255,0)] text-purple"
                  : "px-6 text-text-sub opacity-70 hover:opacity-100 hover:text-text"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* CTA */}
      <div className="px-6 pt-8">
        <Link
          href="/readings/new"
          className="block w-full text-center py-4 rounded-full bg-gradient-to-r from-purple to-purple-deep shadow-[0px_0px_20px_0px_rgba(157,143,255,0.3)] text-black font-bold text-sm font-heading transition-opacity hover:opacity-90"
        >
          Add New Reading
        </Link>
      </div>
    </aside>
  );
}
