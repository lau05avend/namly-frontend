import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function OnboardingLoading() {
  return (
    <div className="flex flex-col gap-6 px-4 pt-8">
      <Skeleton height={12} width={80} borderRadius={6} />
      <Skeleton height={32} width="90%" borderRadius={8} />
      <Skeleton height={16} width="70%" borderRadius={6} />
      <div className="flex flex-wrap gap-2 pt-2">
        <Skeleton height={44} width={120} borderRadius={999} />
        <Skeleton height={44} width={140} borderRadius={999} />
        <Skeleton height={44} width={100} borderRadius={999} />
      </div>
      <Skeleton height={56} borderRadius={999} className="mt-8" />
    </div>
  );
}
