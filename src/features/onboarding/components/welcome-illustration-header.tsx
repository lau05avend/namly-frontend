import Image from "next/image";
import { ONBOARDING_ASSETS } from "@/features/onboarding/constants/onboarding-assets";

export function WelcomeIllustrationHeader() {
  return (
    <section className="relative flex min-h-[38dvh] shrink-0 flex-col items-center justify-center overflow-hidden rounded-b-[2rem] pt-safe">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* <div className="absolute top-8 left-6 size-10 rounded-full bg-highlight/50 blur-[1px]" />
        <div className="absolute top-14 right-10 size-6 rounded-full bg-primary/25" />
        <div className="absolute top-20 left-1/4 size-4 rotate-12 rounded-full bg-cta/30" />
        <div className="absolute right-8 bottom-16 size-8 rounded-full bg-highlight/40" />
        <div className="absolute bottom-20 left-10 size-5 rounded-full bg-primary/20" /> */}
      </div>

      <Image
        src={ONBOARDING_ASSETS.welcomeIllustration}
        alt=""
        width={480}
        height={480}
        priority
        className="relative z-10 h-auto w-[min(58vw,220px)] object-contain drop-shadow-sm"
      />
    </section>
  );
}
