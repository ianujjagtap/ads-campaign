"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCampaigns } from "@/services/campaigns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/primitives/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/primitives/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useTheme } from "next-themes";

const platformChartConfig = {
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

const statusChartConfig = {
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

export function CampaignCharts() {
  const { resolvedTheme } = useTheme();
  const fillColor = resolvedTheme === "dark" ? "#ffffff" : "#000000";

  const { data, isLoading, error } = useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });

  if (isLoading) {
    return <div className="grid gap-4 md:grid-cols-2">
      <Card className="h-[350px] animate-pulse bg-muted/20" />
      <Card className="h-[350px] animate-pulse bg-muted/20" />
    </div>;
  }

  if (error || !data) {
    return <div className="text-red-500">Error loading chart data</div>;
  }

  const campaigns = data.campaigns;
  
  // filter active campaigns
  const activeCampaigns = campaigns.filter(c => c.status === 'active');

  const platformCounts: Record<string, number> = {};
  activeCampaigns.forEach((c) => {
    c.platforms.forEach((p) => {
      const key = p.toLowerCase();
      platformCounts[key] = (platformCounts[key] || 0) + 1;
    });
  });

  const platformChartData = Object.entries(platformCounts).map(([key, value]) => {
    return {
      platform: key,
      visitors: value, 
      fill: fillColor,
    };
  }).sort((a, b) => b.visitors - a.visitors);

  // 2. Process Data for Status Distribution
  const statusCounts: Record<string, number> = {};
  campaigns.forEach((c) => {
    statusCounts[c.status] = (statusCounts[c.status] || 0) + 1;
  });

  const statusChartData = Object.entries(statusCounts).map(([key, value]) => ({
    status: key,
    count: value,
    fill: fillColor,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Active Platforms Chart (Bar Chart) */}
      <Card>
        <CardHeader>
          <CardTitle>Active Platforms</CardTitle>
          <CardDescription>Most active campaigns by platform</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={platformChartConfig}>
            <BarChart accessibilityLayer data={platformChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="platform"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="visitors" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            {platformChartData[0] ? `Most active campaigns on ${platformChartData[0].platform}` : "No active campaigns"}
          </div>
        </CardFooter>
      </Card>

      {/* Campaign Status Chart (Bar Chart) */}
       <Card>
        <CardHeader>
          <CardTitle>Campaign Status</CardTitle>
          <CardDescription>Distribution of campaign statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={statusChartConfig}>
            <BarChart accessibilityLayer data={statusChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="status"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Showing count of active, paused, and completed campaigns
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
