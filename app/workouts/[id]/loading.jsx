import { LoadingPulse } from "@/components/LoadingState";

export default function LoadingWorkout() {
  return (
    <div className="shell grid gap-8 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-14" aria-busy="true">
      <div className="aspect-[4/5] animate-pulse rounded-xl bg-panel" />
      <div>
        <LoadingPulse label="Loading workout…" />
        <div className="space-y-3">
          <div className="h-9 w-3/4 animate-pulse rounded bg-panel" />
          <div className="h-4 w-full animate-pulse rounded bg-panel" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-panel" />
          <div className="mt-6 h-80 animate-pulse rounded-xl bg-panel" />
        </div>
      </div>
    </div>
  );
}
