import { type ChartConfig } from "@/primitives/chart";

export const platformChartConfig = {
  visitors: {
    label: "Campaigns",
  },
  meta: {
    label: "Meta",
    color: "hsl(var(--chart-1))",
  },
  google: {
    label: "Google",
    color: "hsl(var(--chart-2))",
  },
  linkedin: {
    label: "LinkedIn",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export const statusChartConfig = {
  active: {
    label: "Active",
    color: "hsl(var(--chart-2))",
  },
  paused: {
    label: "Paused",
    color: "hsl(var(--chart-3))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
