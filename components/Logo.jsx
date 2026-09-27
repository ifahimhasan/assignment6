import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`} aria-label="FitLog home">
      <Dumbbell className="size-5 -rotate-45 text-accent" strokeWidth={2.5} aria-hidden="true" />
      <span className="font-display text-lg font-bold tracking-wide text-white">FITLOG</span>
    </Link>
  );
}
