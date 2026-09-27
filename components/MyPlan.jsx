"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import PlanRow from "./PlanRow";
import { LoadingPulse } from "./LoadingState";
import { usePlan } from "@/context/PlanContext";
import { SORT_OPTIONS, sortWorkouts } from "@/lib/api";

const TABS = [
  { id: "plan", label: "Today's Plan" },
  { id: "saved", label: "Saved" },
];

function Metric({ label, value, highlight, first }) {
  return (
    <div className={first ? "" : "border-l border-line pl-4 sm:pl-8"}>
      <p className="text-xs text-muted">{label}</p>
      <p
        className={`mt-3 font-display text-3xl font-bold leading-none tabular-nums sm:text-[40px] ${
          highlight ? "text-accent" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-line bg-panel/60 px-6 py-20 text-center sm:py-28">
      <p className="font-display text-[22px] font-bold uppercase tracking-wide text-white">Nothing here yet</p>
      <p className="mt-2 text-[13px] text-muted">Browse the library and add a lift to get today moving.</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-9 items-center rounded-full bg-accent px-5 text-xs font-semibold text-black transition hover:brightness-105"
      >
        Go to workouts
      </Link>
    </div>
  );
}


export default function MyPlan({ workouts = [], loading = false, error = null }) {
  const { hydrated, planIds, savedIds, isDone, markDone, removeFromPlan, removeFromSaved } = usePlan();
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  const byId = useMemo(() => new Map(workouts.map((w) => [w.id, w])), [workouts]);
  const planWorkouts = useMemo(() => planIds.map((id) => byId.get(id)).filter(Boolean), [planIds, byId]);
  const savedWorkouts = useMemo(() => savedIds.map((id) => byId.get(id)).filter(Boolean), [savedIds, byId]);

  const metrics = {
    exercises: planWorkouts.length,
    minutes: planWorkouts.reduce((sum, w) => sum + w.duration, 0),
    calories: planWorkouts.reduce((sum, w) => sum + w.caloriesBurned, 0),
  };

  const list = sortWorkouts(tab === "plan" ? planWorkouts : savedWorkouts, sortBy);
  const showLoading = loading || !hydrated;

  return (
    <div className="shell pt-8 sm:pt-12 lg:px-[52px]">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">My Plan</h1>
      <p className="mt-1 text-[13px] text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-7 grid grid-cols-3 rounded-xl border border-edge bg-panel px-4 py-6 sm:px-7 sm:py-8">
        <Metric label="Exercises" value={metrics.exercises} highlight first />
        <Metric label="Minutes" value={metrics.minutes} />
        <Metric label="Calories" value={metrics.calories} />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Plan lists" className="inline-flex rounded-lg bg-panel-2 p-1">
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
                className={`rounded-md px-5 py-2 text-xs transition-colors ${
                  active ? "bg-raise font-semibold text-white" : "text-muted hover:text-white"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-3 text-xs text-muted">
          Sort By
          <span className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 appearance-none rounded-md border border-line bg-panel-2 pl-3 pr-8 text-xs text-white focus:border-accent/60 focus:outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-soft"
              aria-hidden="true"
            />
          </span>
        </label>
      </div>

      <div id="plan-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-6">
        {showLoading && (
          <div className="rounded-xl bg-panel">
            <LoadingPulse label="Loading workouts…" />
          </div>
        )}

        {!showLoading && error && (
          <div className="rounded-xl bg-panel px-6 py-14 text-center">
            <p className="font-display text-xl font-bold uppercase text-white">Workouts didn&apos;t load</p>
            <p className="mt-2 text-sm text-muted">{error}. Check your connection and reload the page.</p>
            <a
              href="/my-plan"
              className="mt-6 inline-flex h-9 items-center rounded-full bg-accent px-5 text-xs font-semibold text-black"
            >
              Reload
            </a>
          </div>
        )}

        {!showLoading && !error && list.length === 0 && <EmptyState />}

        {!showLoading && !error && list.length > 0 && (
          <ul className="space-y-4">
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
