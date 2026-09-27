import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutStats({ workout, accent = false, className = "" }) {
  const iconClass = `size-3.5 shrink-0 ${accent ? "text-accent" : "text-muted"}`;
  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-soft ${className}`}>
      <li className="inline-flex items-center gap-1.5">
        <Clock className={iconClass} aria-hidden="true" />
        <span>{workout.duration} min</span>
      </li>
      <li className="inline-flex items-center gap-1.5">
        <Flame className={iconClass} aria-hidden="true" />
        <span>{workout.caloriesBurned} kcal</span>
      </li>
      <li className="inline-flex items-center gap-1.5">
        <Star className={iconClass} aria-hidden="true" />
        <span>
          <span className="sr-only">Rating </span>
          {workout.rating}
        </span>
      </li>
    </ul>
  );
}
