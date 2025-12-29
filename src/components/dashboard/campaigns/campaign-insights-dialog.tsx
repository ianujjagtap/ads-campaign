import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/primitives/dialouge";
import { fetchCampaignInsights } from "@/services/campaigns";
import { type CampaignInsights } from "@/types/campaign";
import { Card, CardContent, CardHeader, CardTitle } from "@/primitives/card";
import { Badge } from "@/primitives/badge";
import { InsightsSkeleton } from "@/components/skeletons/insights-skeleton";
import { 
    Eye, 
    MousePointerClick, 
    Target, 
    DollarSign, 
    Activity, 
    TrendingUp, 
    CreditCard 
} from "lucide-react";

interface CampaignInsightsDialogProps {
  campaignId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CampaignInsightsDialog({
  campaignId,
  open,
  onOpenChange,
}: CampaignInsightsDialogProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["campaign-insights", campaignId],
    queryFn: () => {
        if (!campaignId) throw new Error("No ID");
        return fetchCampaignInsights(campaignId);
    },
    enabled: !!campaignId && open,
  });

  const [realtimeInsights, setRealtimeInsights] = React.useState<CampaignInsights | null>(null);
  const [isLive, setIsLive] = React.useState(false);

  // Sync initial data
  React.useEffect(() => {
    if (data?.insights) {
      setRealtimeInsights(data.insights);
    }
  }, [data]);

  // Handle Event Steam
  React.useEffect(() => {
    if (!open || !campaignId) {
        setIsLive(false);
        return;
    }

    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL || "https://mixo-fe-backend-task.vercel.app"}/campaigns/${campaignId}/insights/stream`);

    eventSource.onopen = () => {
        setIsLive(true);
        console.log("Connected to insights stream");
    };

    eventSource.onmessage = (event) => {
        try {
            const parsedData = JSON.parse(event.data);
            // Verify data shape or assuming it matches
            if (parsedData) {
                setRealtimeInsights(parsedData);
            }
        } catch (error) {
            console.error("Error parsing stream data", error);
        }
    };

    eventSource.onerror = (error) => {
        console.error("Stream error", error);
        setIsLive(false);
        eventSource.close();
    };

    return () => {
        eventSource.close();
        setIsLive(false);
    };
  }, [open, campaignId]);

  const insights = realtimeInsights || data?.insights;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between pr-8">
            <DialogTitle className="text-xl">Campaign Performance Insights</DialogTitle>
             {isLive && (
                <Badge variant="outline" className="border-green-500 text-green-500 animate-pulse bg-green-500/10">
                    ● Live
                </Badge>
            )}
          </div>
          <DialogDescription>
            Detailed metrics for campaign {campaignId}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <InsightsSkeleton />
        ) : isError ? (
           <div className="flex h-48 items-center justify-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
            Failed to load insights.
          </div>
        ) : insights ? (
          <div className="grid gap-6 py-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Impressions</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-6 pt-2">
                        <div className="text-3xl font-bold">{insights.impressions.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Clicks</CardTitle>
                        <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-6 pt-2">
                        <div className="text-3xl font-bold">{insights.clicks.toLocaleString()}</div>
                    </CardContent>
                </Card>
                 <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Conversions</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-6 pt-2">
                        <div className="text-3xl font-bold">{insights.conversions.toLocaleString()}</div>
                    </CardContent>
                </Card>
                 <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Spend</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-6 pt-2">
                        <div className="text-3xl font-bold">
                             {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(insights.spend)}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                 <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">CTR</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-6 pt-2">
                        <div className="text-3xl font-bold">{insights.ctr}%</div>
                    </CardContent>
                </Card>
                 <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">CPC</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-6 pt-2">
                        <div className="text-3xl font-bold">
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(insights.cpc)}
                        </div>
                    </CardContent>
                </Card>
                 <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Conv. Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-6 pt-2">
                        <div className="text-3xl font-bold">{insights.conversion_rate}%</div>
                    </CardContent>
                </Card>
            </div>
             <div className="flex justify-end pt-2">
                 <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                    Last Updated: {new Date(insights.timestamp).toLocaleTimeString()}
                </span>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
