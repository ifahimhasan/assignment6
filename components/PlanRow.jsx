"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import WorkoutStats from "./WorkoutStats";

export default function PlanRow({ workout, showDone, done, onDone, onRemove }) {
  return (
    <li
      className={`flex flex-col gap-4 rounded-xl border border-line bg-panel p-3 sm:flex-row sm:items-center sm:p-4 ${
        done ? "opacity-75" : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-panel-2 sm:h-[72px] sm:w-32">
          <Image src={workout.image} alt="" fill sizes="128px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-semibold uppercase tracking-wide text-white">
            {workout.name}
            {done && <span className="ml-2 align-middle text-[10px] font-sans font-bold text-accent">DONE</span>}
          </h3>
          <p className="truncate text-xs text-muted">{workout.equipment}</p>
          <WorkoutStats workout={workout} accent className="mt-1.5" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-line px-4 py-1.5 text-xs font-medium text-white transition-colors hover:border-soft/50"
        >
          View Details
        </Link>

        {showDone && (
          <button
            type="button"
            onClick={() => onDone(workout)}
            disabled={done}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-black transition hover:brightness-110 disabled:cursor-default disabled:bg-transparent disabled:text-accent disabled:ring-1 disabled:ring-accent/50"
          >
            <Check className="size-3.5" aria-hidden="true" />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          type="button"
          onClick={() => onRemove(workout)}
          aria-label={`Remove ${workout.name}`}
          className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-panel-2 hover:text-white"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}
