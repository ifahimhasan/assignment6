"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { usePlan } from "@/context/PlanContext";

const LINKS = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

function NavLinks({ pathname }) {
  return (
    <ul className="flex items-center gap-2">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`block rounded-full px-4 py-1.5 text-[13px] transition-colors ${
                active ? "bg-accent-deep font-medium text-accent" : "text-soft hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function Badge({ label, count, filled }) {
  return (
    <Link
      href="/my-plan"
      aria-label={`${label}: ${count}`}
      className="inline-flex items-center gap-2 text-xs text-soft transition-colors hover:text-white"
    >
      {label}
      <span
        className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] font-bold tabular-nums ${
          filled ? "bg-accent text-black" : "border border-line-strong text-soft"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-ink/90 backdrop-blur-md">
      <nav className="shell" aria-label="Main">
        <div className="grid h-16 grid-cols-[1fr_auto] items-center gap-4 md:h-[76px] md:grid-cols-[1fr_auto_1fr]">
          <Logo />
          <div className="hidden md:block">
            <NavLinks pathname={pathname} />
          </div>
          <div className="flex items-center justify-end gap-5">
            <Badge label="Plan" count={planCount} filled />
            <Badge label="Saved" count={savedCount} />
          </div>
        </div>
        <div className="flex justify-center pb-3 md:hidden">
          <NavLinks pathname={pathname} />
        </div>
      </nav>
    </header>
  );
}
