import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function HomeLoading() {
  return (
    <div className="flex flex-col gap-8 px-4 pt-6">
      <Skeleton height={72} borderRadius={16} />
      <Skeleton height={32} width={160} borderRadius={8} />
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-3 flex flex-col gap-2">
          <Skeleton height={18} width={110} borderRadius={6} />
          <Skeleton height={168} borderRadius={24} />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <Skeleton height={18} width={56} borderRadius={6} />
          <Skeleton height={168} borderRadius={16} />
        </div>
      </div>
      <Skeleton height={18} width={120} borderRadius={6} />
      <Skeleton count={2} height={64} borderRadius={24} />
      <div className="flex flex-col gap-2">
        <Skeleton height={18} width={140} borderRadius={6} />
        <Skeleton height={18} width={200} borderRadius={6} />
        <Skeleton height={72} borderRadius={16} />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton height={18} width={160} borderRadius={6} />
        <Skeleton height={72} borderRadius={16} />
      </div>
    </div>
  );
}
