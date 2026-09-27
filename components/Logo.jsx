import Link from "next/link";
import DumbbellIcon from "./DumbbellIcon";

// Navbar: diagonal dumbbell. Footer: horizontal dumbbell (as in the Figma file).
export default function Logo({ variant = "nav" }) {
  const footer = variant === "footer";
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="FitLog home">
      <DumbbellIcon className={`text-accent ${footer ? "size-4" : "size-6 rotate-45"}`} />
      <span className={`font-display font-bold tracking-wide text-white ${footer ? "text-sm" : "text-xl"}`}>
        FITLOG
      </span>
    </Link>
  );
}
