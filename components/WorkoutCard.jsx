import Image from "next/image";
import Link from "next/link";
import TagPills from "./TagPills";
import WorkoutStats from "./WorkoutStats";

export default function WorkoutCard({ workout, priority = false }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition-colors hover:border-accent/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-panel-2">
        <Image
          src={workout.image}
          alt={`Illustration for ${workout.name}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <TagPills tags={workout.muscleGroups} />
        <h3 className="mt-3 font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white">
          {workout.name}
        </h3>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>
        <div className="mt-auto pt-4">
          <WorkoutStats workout={workout} className="border-t border-line pt-3" />
        </div>
      </div>
    </Link>
  );
}
