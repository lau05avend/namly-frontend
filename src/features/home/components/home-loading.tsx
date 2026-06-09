import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function HomeLoading() {
  return (
    <div className="flex flex-col gap-6 px-4 pt-6">
      <Skeleton height={72} borderRadius={16} />
      <Skeleton height={32} width={160} borderRadius={8} />
      <div className="grid grid-cols-5 gap-3">
        <Skeleton className="col-span-3" height={180} borderRadius={24} />
        <Skeleton className="col-span-2" height={180} borderRadius={24} />
      </div>
      <Skeleton height={20} width={120} borderRadius={8} />
      <Skeleton count={2} height={64} borderRadius={24} />
    </div>
  );
}
