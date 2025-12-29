import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/primitives/dialouge";
import { Badge } from "@/primitives/badge";
import { fetchCampaignById } from "@/services/campaigns";

interface CampaignDetailsDialogProps {
  campaignId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CampaignDetailsDialog({
  campaignId,
  open,
  onOpenChange,
}: CampaignDetailsDialogProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["campaign", campaignId],
    queryFn: () => {
        if (!campaignId) throw new Error("No ID");
        return fetchCampaignById(campaignId);
    },
    enabled: !!campaignId && open,
  });

  const campaign = data?.campaign;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Campaign Details</DialogTitle>
          <DialogDescription>
            View detailed information for this campaign.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4 py-4">
             <div className="h-4 w-1/3 rounded-sm bg-muted animate-pulse" />
             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="h-10 rounded-sm bg-muted animate-pulse" />
                <div className="h-10 rounded-sm bg-muted animate-pulse" />
             </div>
          </div>
        ) : isError ? (
           <div className="flex h-32 items-center justify-center text-sm text-destructive">
            Failed to load campaign details.
          </div>
        ) : campaign ? (
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">Name</span>
                <span className="font-semibold">{campaign.name}</span>
            </div>
             <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">Status</span>
                <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                    {campaign.status}
                </Badge>
            </div>
            
             <div className="grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-2">
                <div>
                     <span className="text-xs text-muted-foreground block mb-1">Total Budget</span>
                     <span className="font-mono font-medium">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(campaign.budget)}
                     </span>
                </div>
                 <div>
                     <span className="text-xs text-muted-foreground block mb-1">Daily Budget</span>
                     <span className="font-mono font-medium">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(campaign.daily_budget)}
                     </span>
                </div>
             </div>

              <div className="grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-2">
                <div>
                     <span className="text-xs text-muted-foreground block mb-1">Full Campaign ID</span>
                     <span className="text-xs font-mono">{campaign.id}</span>
                </div>
                 <div>
                     <span className="text-xs text-muted-foreground block mb-1">Brand ID</span>
                     <span className="text-xs font-mono">{campaign.brand_id}</span>
                </div>
             </div>

            <div className="space-y-2 border-t pt-4">
              <span className="text-sm font-medium text-muted-foreground">Platforms</span>
              <div className="flex flex-wrap gap-2">
                {campaign.platforms.map((platform) => (
                  <Badge key={platform} variant="outline">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-xs text-muted-foreground text-right border-t pt-2">
                Created: {new Date(campaign.created_at).toLocaleString()}
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
