"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCampaigns } from "@/services/campaigns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/primitives/card";
import { Activity, PauseCircle, CheckCircle, BarChart3 } from "lucide-react";

import { StatsSkeleton } from "@/components/skeletons/stats-skeleton";

export function CampaignStats() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });

  if (isLoading) {
    return <StatsSkeleton />;
  }

  if (error) {
    return <div className="text-red-500">Error loading campaign data</div>;
  }

  const campaigns = data?.campaigns || [];
  const totalCampaigns = data?.total || 0;
  
  const activeCampaigns = campaigns.filter((c) => c.status === "active");
  const pausedCampaigns = campaigns.filter((c) => c.status === "paused");
  const completedCampaigns = campaigns.filter((c) => c.status === "completed");

  const activeBudget = activeCampaigns.reduce((sum, c) => sum + c.budget, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      title: "Total Campaigns",
      value: totalCampaigns,
      description: "All time campaigns",
      icon: BarChart3,
      color: "text-blue-500",
    },
    {
      title: "Active Campaigns",
      value: activeCampaigns.length,
      description: `${formatCurrency(activeBudget)} active budget`,
      icon: Activity,
      color: "text-green-500",
    },
    {
      title: "Paused Campaigns",
      value: pausedCampaigns.length,
      description: "Temporarily stopped",
      icon: PauseCircle,
      color: "text-yellow-500",
    },
    {
      title: "Completed",
      value: completedCampaigns.length,
      description: "Past campaigns",
      icon: CheckCircle,
      color: "text-gray-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
