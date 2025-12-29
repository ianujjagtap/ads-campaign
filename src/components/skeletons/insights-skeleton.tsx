import { Card, CardHeader, CardContent } from "@/primitives/card";
import { Skeleton } from "@/primitives/skeleton";

export function InsightsSkeleton() {
  return (
    <div className="grid gap-6 py-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={`top-${i}`} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <Skeleton className="h-9 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={`bottom-${i}`} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <Skeleton className="h-9 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
