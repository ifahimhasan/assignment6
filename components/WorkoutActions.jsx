"use client";

import { Bookmark, BookmarkCheck, CalendarPlus, Check } from "lucide-react";
import { PLAN_CAP, usePlan } from "@/context/PlanContext";

export default function WorkoutActions({ workout }) {
  const { hydrated, isInPlan, isSaved, planIsFull, planCount, addToPlan, toggleSaved } = usePlan();
  const inPlan = hydrated && isInPlan(workout.id);
  const saved = hydrated && isSaved(workout.id);
  const blocked = hydrated && planIsFull && !inPlan;

  let addLabel = "Add to today's plan";
  if (inPlan) addLabel = "In today's plan";
  else if (blocked) addLabel = `Plan is full (${planCount}/${PLAN_CAP})`;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={inPlan || blocked}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-accent-deep disabled:text-accent disabled:ring-1 disabled:ring-accent/30 disabled:active:scale-100"
      >
        {inPlan ? <Check className="size-4" aria-hidden="true" /> : <CalendarPlus className="size-4" aria-hidden="true" />}
        {addLabel}
      </button>

      <button
        type="button"
        onClick={() => toggleSaved(workout)}
        aria-pressed={saved}
        className={`inline-flex items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-medium transition active:scale-[0.98] ${
          saved ? "border-accent/50 text-accent" : "border-line text-white hover:border-soft/50"
        }`}
      >
        {saved ? <BookmarkCheck className="size-4" aria-hidden="true" /> : <Bookmark className="size-4" aria-hidden="true" />}
        {saved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
