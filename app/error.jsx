"use client";

import Link from "next/link";

export default function Error({ reset }) {
  return (
    <section className="mx-auto max-w-xl px-4 pt-20 text-center">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white">Couldn&apos;t load this page</h1>
      <p className="mt-3 text-sm text-muted">The workout data didn&apos;t come through. Check your connection and try again.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black transition hover:brightness-110"
        >
          Try again
        </button>
        <Link href="/" className="rounded-full border border-line px-5 py-2 text-sm font-medium text-white hover:border-soft/50">
          Go to workouts
        </Link>
      </div>
    </section>
  );
}
