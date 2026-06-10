import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function ProfileLoading() {
  return (
    <div className="flex flex-col items-center gap-6 pt-6">
      <Skeleton circle width={96} height={96} />
      <div className="flex w-full flex-col items-center gap-2">
        <Skeleton height={24} width={180} borderRadius={8} />
        <Skeleton height={16} width={140} borderRadius={8} />
      </div>
      <div className="flex w-full flex-col gap-3 pt-4">
        <Skeleton height={12} width={80} borderRadius={6} />
        <Skeleton height={72} borderRadius={24} />
        <Skeleton height={72} borderRadius={24} />
      </div>
    </div>
  );
}
