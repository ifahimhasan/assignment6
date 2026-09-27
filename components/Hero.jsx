import Image from "next/image";
import { ArrowDown } from "lucide-react";

// Swap this for the exported Figma hero (e.g. "/hero.png" in /public) if you have it.
const HERO_IMAGE = "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691401.jpg?w=740";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-10">
      <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-line bg-panel p-6 sm:p-10 md:grid-cols-[1.25fr_1fr] lg:p-14">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Workout Library</p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-soft sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the
            week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:brightness-110 active:scale-[0.98]"
          >
            <ArrowDown className="size-4" aria-hidden="true" />
            Browse workouts
          </a>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div
            className="absolute inset-6 rounded-full bg-accent/15 blur-3xl"
            aria-hidden="true"
          />
          <Image
            src={HERO_IMAGE}
            alt="3D athlete training in the gym"
            fill
            priority
            sizes="(min-width: 768px) 384px, 90vw"
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
