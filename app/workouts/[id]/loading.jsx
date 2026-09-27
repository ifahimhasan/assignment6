import { LoadingPulse } from "@/components/LoadingState";

export default function LoadingWorkout() {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 sm:px-6 sm:pt-12 lg:grid-cols-2 lg:gap-12" aria-busy="true">
      <div className="aspect-[4/5] animate-pulse rounded-2xl border border-line bg-panel" />
      <div>
        <LoadingPulse label="Loading workout…" />
        <div className="space-y-3">
          <div className="h-9 w-3/4 animate-pulse rounded bg-panel" />
          <div className="h-4 w-full animate-pulse rounded bg-panel" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-panel" />
          <div className="mt-6 h-72 animate-pulse rounded-xl border border-line bg-panel" />
        </div>
      </div>
    </div>
  );
}
