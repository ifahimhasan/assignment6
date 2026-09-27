import Image from "next/image";
import Link from "next/link";
import TagPills from "./TagPills";
import WorkoutStats from "./WorkoutStats";

export default function WorkoutCard({ workout, priority = false }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-edge bg-panel transition-colors hover:border-accent/40"
    >
      <div className="relative aspect-[2/1] overflow-hidden bg-panel-2">
        <Image
          src={workout.image}
          alt={`Illustration for ${workout.name}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 430px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <TagPills tags={workout.muscleGroups} />
        <h3 className="mt-3.5 font-display text-xl font-bold uppercase leading-tight tracking-wide text-white">
          {workout.name}
        </h3>
        <p className="mt-1.5 text-xs text-muted">{workout.equipment}</p>
        <div className="mt-auto pt-6">
          <WorkoutStats workout={workout} className="border-t border-line pt-5" />
        </div>
      </div>
    </Link>
  );
}
