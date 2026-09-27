import WorkoutCard from "./WorkoutCard";
import { fetchWorkouts } from "@/lib/api";

// Server component: fetches every workout from the FitLog API.
export default async function Library() {
  let workouts;
  try {
    workouts = await fetchWorkouts();
  } catch (err) {
    return (
      <div className="rounded-xl bg-panel px-6 py-14 text-center">
        <p className="font-display text-xl font-bold uppercase text-white">Workouts didn&apos;t load</p>
        <p className="mt-2 text-sm text-muted">{err.message}. Check your connection and reload the page.</p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-full bg-accent px-5 py-2 text-xs font-semibold text-black hover:brightness-105"
        >
          Reload
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
      {workouts.map((workout, i) => (
        <WorkoutCard key={workout.id} workout={workout} priority={i < 3} />
      ))}
    </div>
  );
}
