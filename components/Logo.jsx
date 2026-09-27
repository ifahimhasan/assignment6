import Link from "next/link";
import { Dumbbell } from "lucide-react";

// Navbar: diagonal dumbbell. Footer: horizontal dumbbell (as in the Figma file).
export default function Logo({ variant = "nav" }) {
  const footer = variant === "footer";
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="FitLog home">
      <Dumbbell
        className={`text-accent ${footer ? "size-4 rotate-45" : "size-5 rotate-90"}`}
        strokeWidth={2.5}
        aria-hidden="true"
      />
      <span className={`font-display font-bold tracking-wide text-white ${footer ? "text-sm" : "text-lg"}`}>
        FITLOG
      </span>
    </Link>
  );
}
