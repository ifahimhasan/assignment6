import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="shell pt-6 sm:pt-10">
      <div className="grid items-center gap-8 rounded-xl bg-panel px-6 py-10 sm:px-10 md:grid-cols-[1.4fr_1fr] md:py-14 lg:min-h-[455px] lg:px-16">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent">Workout Library</p>
          <h1 className="mt-5 max-w-[600px] font-display text-[40px] font-bold uppercase leading-[0.95] text-white sm:text-5xl lg:text-[64px]">
            Train with intent. Log every set.
          </h1>
          <p className="mt-5 max-w-[500px] text-sm leading-relaxed text-soft sm:text-[15px]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the
            week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex h-[42px] items-center gap-2 rounded-md bg-accent px-6 text-[11px] font-bold uppercase tracking-wider text-black transition hover:brightness-105 active:scale-[0.98]"
          >
            <ArrowDown className="size-3.5" strokeWidth={2.75} aria-hidden="true" />
            Browse workouts
          </a>
        </div>

        {/* Replace /public/hero.png with the image exported from Figma for a sharper result. */}
        <div className="relative mx-auto h-[240px] w-full max-w-[220px] sm:h-[300px] sm:max-w-[260px] lg:h-[340px] lg:max-w-[300px]">
          <Image
            src="/hero.png"
            alt="Anatomy figure training biceps on a preacher curl machine"
            fill
            priority
            sizes="300px"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
