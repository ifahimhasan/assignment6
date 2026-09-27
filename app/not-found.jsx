import Link from "next/link";
import { Dumbbell } from "lucide-react";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 pt-20 text-center sm:pt-28">
      <Dumbbell className="size-10 -rotate-45 text-accent" strokeWidth={2.25} aria-hidden="true" />
      <p className="mt-6 font-display text-7xl font-bold text-white sm:text-8xl">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-white">This rep doesn&apos;t exist</h1>
      <p className="mt-3 text-sm text-muted">
        The page you&apos;re looking for was moved or never existed. Head back to the library and pick a lift.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black transition hover:brightness-110">
          Go to workouts
        </Link>
        <Link href="/my-plan" className="rounded-full border border-line px-5 py-2 text-sm font-medium text-white hover:border-soft/50">
          Open my plan
        </Link>
      </div>
    </section>
  );
}
