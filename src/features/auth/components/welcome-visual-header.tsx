import { NamlyLogo } from "@/components/brand";

export function WelcomeVisualHeader() {
  return (
    <section className="relative flex min-h-[38dvh] shrink-0 flex-col items-center justify-center overflow-hidden rounded-b-[2rem] bg-mint/80 px-6 pb-8 pt-safe">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-8 left-6 size-10 rounded-full bg-highlight/50 blur-[1px]" />
        <div className="absolute top-14 right-10 size-6 rounded-full bg-primary/25" />
        <div className="absolute top-20 left-1/4 size-4 rotate-12 rounded-full bg-cta/30" />
        <div className="absolute right-8 bottom-16 size-8 rounded-full bg-highlight/40" />
        <div className="absolute bottom-20 left-10 size-5 rounded-full bg-primary/20" />
      </div>

      <NamlyLogo
        size={140}
        priority
        className="relative z-10 w-[140px] drop-shadow-sm"
      />
    </section>
  );
}
