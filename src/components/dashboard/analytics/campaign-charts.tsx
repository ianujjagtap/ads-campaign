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
} from "@/primitives/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useTheme } from "next-themes";
import { platformChartConfig, statusChartConfig } from "@/config/charts";
import { ChartSkeleton } from "@/components/skeletons/chart-skeleton";

export function CampaignCharts() {
  const { resolvedTheme } = useTheme();
  const fillColor = resolvedTheme === "dark" ? "#ffffff" : "#000000";

  const { data, isLoading, error } = useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });

  if (isLoading) {
    return <ChartSkeleton />;
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

  // 2. process data for status distribution
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
      {/* active platforms chart (bar chart) */}
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

      {/* campaign status chart (bar chart) */}
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
