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
    <ul className="flex items-center gap-1">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                active
                  ? "bg-accent-deep font-medium text-accent ring-1 ring-accent/25"
                  : "text-soft hover:text-white"
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

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6" aria-label="Main">
        <div className="grid h-16 grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <Logo />

          <div className="hidden md:block">
            <NavLinks pathname={pathname} />
          </div>

          <div className="flex items-center justify-end gap-2">
            <Link
              href="/my-plan"
              aria-label={`Today's plan: ${planCount} lifts`}
              className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs text-soft transition-colors hover:text-white"
            >
              Plan
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-black tabular-nums">
                {planCount}
              </span>
            </Link>
            <Link
              href="/my-plan"
              aria-label={`Saved: ${savedCount} lifts`}
              className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs text-soft transition-colors hover:text-white"
            >
              Saved
              <span className="grid h-5 min-w-5 place-items-center rounded-full border border-soft/40 px-1.5 text-[11px] font-semibold text-white tabular-nums">
                {savedCount}
              </span>
            </Link>
          </div>
        </div>

        {/* On small screens the links drop to their own row so they stay easy to tap. */}
        <div className="flex justify-center pb-3 md:hidden">
          <NavLinks pathname={pathname} />
        </div>
      </nav>
    </header>
  );
}
