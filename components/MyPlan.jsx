"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, RotateCw } from "lucide-react";
import PlanRow from "./PlanRow";
import { LoadingPulse } from "./LoadingState";
import { usePlan } from "@/context/PlanContext";
import { SORT_OPTIONS, fetchWorkouts, sortWorkouts } from "@/lib/api";

const TABS = [
  { id: "plan", label: "Today's Plan" },
  { id: "saved", label: "Saved" },
];

function Metric({ label, value, highlight }) {
  return (
    <div className="px-4 py-5 sm:px-6">
      <p className="text-xs text-muted">{label}</p>
      <p className={`mt-1 font-display text-3xl font-bold tabular-nums sm:text-4xl ${highlight ? "text-accent" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-line bg-panel px-6 py-16 text-center">
      <p className="font-display text-xl font-bold uppercase tracking-wide text-white">Nothing here yet</p>
      <p className="mt-2 text-sm text-muted">Browse the library and add a lift to get today moving.</p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black transition hover:brightness-110"
      >
        Go to workouts
      </Link>
    </div>
  );
}

export default function MyPlan() {
  const { hydrated, planIds, savedIds, isDone, markDone, removeFromPlan, removeFromSaved } = usePlan();
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      setWorkouts(await fetchWorkouts());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const byId = useMemo(() => new Map(workouts.map((w) => [w.id, w])), [workouts]);
  const planWorkouts = useMemo(() => planIds.map((id) => byId.get(id)).filter(Boolean), [planIds, byId]);
  const savedWorkouts = useMemo(() => savedIds.map((id) => byId.get(id)).filter(Boolean), [savedIds, byId]);

  const metrics = useMemo(
    () => ({
      exercises: planWorkouts.length,
      minutes: planWorkouts.reduce((sum, w) => sum + w.duration, 0),
      calories: planWorkouts.reduce((sum, w) => sum + w.caloriesBurned, 0),
    }),
    [planWorkouts]
  );

  const list = sortWorkouts(tab === "plan" ? planWorkouts : savedWorkouts, sortBy);
  const loading = status === "loading" || !hydrated;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">My Plan</h1>
      <p className="mt-1 text-sm text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-panel">
        <Metric label="Exercises" value={metrics.exercises} highlight />
        <Metric label="Minutes" value={metrics.minutes} />
        <Metric label="Calories" value={metrics.calories} />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Plan lists" className="inline-flex rounded-lg border border-line bg-panel p-1">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active}
                aria-controls="plan-panel"
                onClick={() => setTab(t.id)}
                className={`rounded-md px-4 py-1.5 text-xs font-medium transition-colors ${
                  active ? "bg-panel-2 text-white shadow-[inset_0_0_0_1px_var(--color-line)]" : "text-muted hover:text-white"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 text-xs text-muted">
          Sort By
          <span className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-md border border-line bg-panel py-1.5 pl-3 pr-8 text-xs text-white focus:border-accent/60 focus:outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-soft" aria-hidden="true" />
          </span>
        </label>
      </div>

      <div id="plan-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-5">
        {loading && (
          <div className="rounded-xl border border-line bg-panel">
            <LoadingPulse label="Loading workouts…" />
          </div>
        )}

        {!loading && status === "error" && (
          <div className="rounded-xl border border-line bg-panel px-6 py-12 text-center">
            <p className="font-display text-xl font-semibold uppercase text-white">Workouts didn&apos;t load</p>
            <p className="mt-2 text-sm text-muted">Check your connection and try again.</p>
            <button
              type="button"
              onClick={load}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black hover:brightness-110"
            >
              <RotateCw className="size-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {!loading && status === "ready" && list.length === 0 && <EmptyState />}

        {!loading && status === "ready" && list.length > 0 && (
          <ul className="space-y-3">
            {list.map((workout) => (
              <PlanRow
                key={workout.id}
                workout={workout}
                showDone={tab === "plan"}
                done={tab === "plan" && isDone(workout.id)}
                onDone={markDone}
                onRemove={tab === "plan" ? removeFromPlan : removeFromSaved}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
