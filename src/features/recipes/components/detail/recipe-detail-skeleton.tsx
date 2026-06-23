export function RecipeDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden>
      <div className="aspect-[4/3] animate-pulse rounded-2xl bg-foreground/[0.06]" />

      <div className="flex flex-col gap-4">
        <div className="h-8 w-3/4 animate-pulse rounded-lg bg-foreground/[0.06]" />
        <div className="flex flex-col gap-1.5 pl-1">
          <div className="h-4 w-full animate-pulse rounded bg-foreground/[0.05]" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-foreground/[0.05]" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-foreground/[0.06]" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-foreground/[0.06]" />
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-7">
        <div className="flex w-full gap-0 border-b border-foreground/8 pb-3">
          <div className="flex flex-1 justify-center">
            <div className="h-4 w-20 animate-pulse rounded bg-foreground/[0.06]" />
          </div>
          <div className="flex flex-1 justify-center">
            <div className="h-4 w-28 animate-pulse rounded bg-foreground/[0.06]" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-4 w-24 animate-pulse rounded bg-foreground/[0.05]" />
          <div className="grid grid-cols-2 gap-2.5">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="flex flex-col gap-1.5 rounded-xl border border-foreground/6 bg-foreground/[0.03] px-3 py-2.5"
              >
                <div className="h-4 w-full animate-pulse rounded bg-foreground/[0.05]" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-foreground/[0.04]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
