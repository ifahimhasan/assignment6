import { cache } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import TagPills from "@/components/TagPills";
import WorkoutActions from "@/components/WorkoutActions";
import { fetchWorkout } from "@/lib/api";

const getWorkout = cache(async (id) => {
  if (!/^\d+$/.test(id)) return null;
  return fetchWorkout(id, { next: { revalidate: 3600 } });
});

export async function generateMetadata({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);
  if (!workout) return { title: "Workout not found" };
  return { title: workout.name, description: workout.description };
}

export default async function WorkoutDetailPage({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);
  if (!workout) notFound();

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <article className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 sm:px-6 sm:pt-12 lg:grid-cols-2 lg:gap-12">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-panel-2">
          <Image
            src={workout.image}
            alt={`Illustration for ${workout.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div>
        <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide text-white sm:text-4xl">
          {workout.name}
        </h1>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-soft sm:text-base">{workout.description}</p>
        <TagPills tags={workout.muscleGroups} uppercase={false} className="mt-4" />

        <dl className="mt-8 divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel">
          {specs.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</dt>
              <dd className="text-right text-sm text-white">{value}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-10" aria-labelledby="instructions-heading">
          <h2 id="instructions-heading" className="font-display text-lg font-semibold uppercase tracking-wide text-white">
            Instructions
          </h2>
          <ol className="mt-4 space-y-3">
            {workout.instructions?.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-soft">
                <span className="w-5 shrink-0 font-semibold text-accent tabular-nums">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-10">
          <WorkoutActions workout={workout} />
        </div>
      </div>
    </article>
  );
}
