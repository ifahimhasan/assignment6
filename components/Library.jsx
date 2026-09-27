"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RotateCw, Search } from "lucide-react";
import WorkoutCard from "./WorkoutCard";
import { CardSkeletonGrid, LoadingPulse } from "./LoadingState";
import { fetchWorkouts } from "@/lib/api";

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const data = await fetchWorkouts();
      setWorkouts(data);
      setStatus("ready");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Search by workout name or muscle-group tag.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return workouts;
    return workouts.filter(
      (w) =>
        w.name.toLowerCase().includes(q) || w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [workouts, query]);

  return (
    <section id="library" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-14 sm:px-6 sm:pt-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white">The Library</h2>
          <p className="mt-1 text-sm text-muted">Twelve lifts covering every major muscle group.</p>
        </div>

        <label className="relative block w-full sm:w-64">
          <span className="sr-only">Search workouts by name or muscle group</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or muscle"
            className="w-full rounded-md border border-line bg-panel py-2 pl-9 pr-3 text-sm text-white placeholder:text-muted focus:border-accent/60 focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-8">
        {status === "loading" && (
          <>
            <LoadingPulse />
            <CardSkeletonGrid />
          </>
        )}

        {status === "error" && (
          <div className="rounded-xl border border-line bg-panel px-6 py-12 text-center">
            <p className="font-display text-xl font-semibold uppercase text-white">Workouts didn&apos;t load</p>
            <p className="mt-2 text-sm text-muted">{error}. Check your connection and try again.</p>
            <button
              type="button"
              onClick={load}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black hover:brightness-110"
            >
              <RotateCw className="size-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {status === "ready" && visible.length === 0 && (
          <div className="rounded-xl border border-line bg-panel px-6 py-12 text-center">
            <p className="font-display text-xl font-semibold uppercase text-white">No lifts match &ldquo;{query}&rdquo;</p>
            <p className="mt-2 text-sm text-muted">Try a workout name like &ldquo;squat&rdquo; or a muscle like &ldquo;core&rdquo;.</p>
          </div>
        )}

        {status === "ready" && visible.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((workout, i) => (
              <WorkoutCard key={workout.id} workout={workout} priority={i < 3} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
