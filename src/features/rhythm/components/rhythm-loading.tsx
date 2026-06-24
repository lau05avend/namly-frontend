import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function RhythmLoading() {
  return (
    <div className="flex flex-col gap-8 py-2" aria-hidden>
      <div className="flex flex-col gap-5">
        <Skeleton height={14} width={100} borderRadius={6} />
        <Skeleton height={32} width="80%" borderRadius={8} />
        <Skeleton height={48} borderRadius={12} />
        <Skeleton height={16} width={140} borderRadius={6} />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton height={64} borderRadius={12} />
          <Skeleton height={64} borderRadius={12} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Skeleton height={14} width={100} borderRadius={6} />
        <Skeleton count={3} height={52} borderRadius={12} />
      </div>

      <div className="flex flex-col gap-3">
        <Skeleton height={14} width={100} borderRadius={6} />
        <Skeleton count={3} height={20} borderRadius={6} />
      </div>
    </div>
  );
}
