import { Suspense } from "react";
import Hero from "@/components/Hero";
import Library from "@/components/Library";
import { LibraryLoading } from "@/components/LoadingState";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="library" className="shell scroll-mt-24 pt-16 lg:pt-[72px]">
        <h2 className="font-display text-[28px] font-bold uppercase leading-none tracking-wide text-white sm:text-[32px]">
          The Library
        </h2>
        <p className="mt-2 text-[13px] text-muted">Twelve lifts covering every major muscle group.</p>
        <div className="mt-8 lg:mt-10">
          {/* Shows the loading animation while the API request is in flight */}
          <Suspense fallback={<LibraryLoading />}>
            <Library />
          </Suspense>
        </div>
      </section>
    </>
  );
}
