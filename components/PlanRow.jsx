"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import WorkoutStats from "./WorkoutStats";

export default function PlanRow({ workout, showDone, done, onDone, onRemove }) {
  return (
    <li className="flex flex-col gap-4 rounded-xl bg-panel p-4 sm:flex-row sm:items-center sm:px-5">
      <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-5">
        <div className="relative h-[72px] w-[124px] shrink-0 overflow-hidden rounded-lg bg-panel-2 sm:h-[84px] sm:w-[150px]">
          <Image src={workout.image} alt="" fill sizes="150px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-bold uppercase tracking-wide text-white">{workout.name}</h3>
          <p className="truncate text-xs text-muted">{workout.equipment}</p>
          <WorkoutStats workout={workout} accent className="mt-2" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Link
          href={`/workouts/${workout.id}`}
          className="inline-flex h-9 items-center rounded-full border border-line-strong px-5 text-xs text-white transition-colors hover:border-soft/50"
        >
          View Details
        </Link>

        {showDone && (
          <button
            type="button"
            onClick={() => onDone(workout)}
            disabled={done}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-5 text-xs font-semibold text-black transition hover:brightness-105 disabled:cursor-default disabled:bg-accent-deep disabled:text-accent disabled:ring-1 disabled:ring-accent/40"
          >
            <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          type="button"
          onClick={() => onRemove(workout)}
          aria-label={`Remove ${workout.name}`}
          className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-raise hover:text-white"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}
