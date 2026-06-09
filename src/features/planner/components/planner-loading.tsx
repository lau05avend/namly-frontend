import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function PlannerLoading() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton height={48} borderRadius={16} />
      <Skeleton height={72} borderRadius={16} />
      <Skeleton height={120} borderRadius={24} />
      <Skeleton count={2} height={100} borderRadius={24} />
    </div>
  );
}
