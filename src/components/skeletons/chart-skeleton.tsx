import { Card } from "@/primitives/card";

export function ChartSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="h-[350px] animate-pulse bg-muted/20" />
      <Card className="h-[350px] animate-pulse bg-muted/20" />
    </div>
  );
}
