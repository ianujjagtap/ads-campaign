import { Skeleton } from "@/primitives/skeleton";

export function DetailsSkeleton() {
  return (
    <div className="space-y-4 py-4">
      <Skeleton className="h-4 w-1/3 rounded-sm" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Skeleton className="h-10 rounded-sm" />
        <Skeleton className="h-10 rounded-sm" />
      </div>
    </div>
  );
}
