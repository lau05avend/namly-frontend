import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function HistoryLoading() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton height={16} width={180} borderRadius={8} />
      <Skeleton height={72} borderRadius={16} />
      <Skeleton height={72} borderRadius={16} />
      <Skeleton height={72} borderRadius={16} />
    </div>
  );
}
