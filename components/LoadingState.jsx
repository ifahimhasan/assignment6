import { Dumbbell } from "lucide-react";

export function LoadingPulse({ label = "Loading workouts…" }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center justify-center gap-4 py-10">
      <Dumbbell className="size-9 animate-lift text-accent" strokeWidth={2.25} aria-hidden="true" />
      <p className="text-sm text-soft">{label}</p>
    </div>
  );
}

export function CardSkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-line bg-panel">
          <div className="aspect-[16/10] animate-pulse bg-panel-2" />
          <div className="space-y-3 p-4">
            <div className="flex gap-1.5">
              <div className="h-4 w-14 animate-pulse rounded-full bg-panel-2" />
              <div className="h-4 w-12 animate-pulse rounded-full bg-panel-2" />
            </div>
            <div className="h-5 w-3/4 animate-pulse rounded bg-panel-2" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-panel-2" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-panel-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
