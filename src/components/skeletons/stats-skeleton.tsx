import { Card, CardContent, CardHeader } from "@/primitives/card";

export function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-4 bg-muted rounded" />
          </CardHeader>
          <CardContent>
            <div className="h-8 w-16 bg-muted rounded" />
            <div className="mt-2 h-3 w-32 bg-muted rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
