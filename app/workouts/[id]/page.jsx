import { cache } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import TagPills from "@/components/TagPills";
import WorkoutActions from "@/components/WorkoutActions";
import { fetchWorkout } from "@/lib/api";

const getWorkout = cache(async (id) => {
  if (!/^\d+$/.test(id)) return null;
  return fetchWorkout(id);
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
    <article className="shell grid gap-8 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-14">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-panel lg:self-start">
        <Image
          src={workout.image}
          alt={`Illustration for ${workout.name}`}
          fill
          priority
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover"
        />
      </div>

      <div>
        <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide text-white sm:text-4xl">
          {workout.name}
        </h1>
        <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-muted">{workout.description}</p>
        <TagPills tags={workout.muscleGroups} uppercase={false} className="mt-4" />

        <dl className="mt-7 overflow-hidden rounded-xl bg-panel-2">
          {specs.map(([label, value], i) => (
            <div
              key={label}
              className={`flex min-h-12 items-center justify-between gap-4 px-5 sm:px-6 ${
                i < specs.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">{label}</dt>
              <dd className="text-right text-[13px] text-white">{value}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-8" aria-labelledby="instructions-heading">
          <h2 id="instructions-heading" className="text-sm font-bold uppercase tracking-wide text-white">
            Instructions
          </h2>
          <ol className="mt-4 space-y-3">
            {workout.instructions?.map((step, i) => (
              <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-soft">
                <span className="w-4 shrink-0 tabular-nums">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-8">
          <WorkoutActions workout={workout} />
        </div>
      </div>
    </article>
  );
}
