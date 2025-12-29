export interface Campaign {
  id: string;
  name: string;
  brand_id: string;
  status: "active" | "paused" | "completed";
  budget: number;
  daily_budget: number;
  platforms: string[];
  created_at: string;
}

export interface CampaignsResponse {
  campaigns: Campaign[];
  total: number;
}


export interface CampaignDetailResponse {
  campaign: Campaign;
}

export const fetchCampaigns = async (): Promise<CampaignsResponse> => {
  const response = await fetch(`${process.env.MIXO_API_URL}/campaigns`);
  if (!response.ok) {
    throw new Error("Failed to fetch campaigns");
  }
  return response.json();
};

export const fetchCampaignById = async (id: string): Promise<CampaignDetailResponse> => {
    const response = await fetch(`${process.env.MIXO_API_URL}/campaigns/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch campaign details");
    }
    return response.json();
};
export interface GlobalInsights {
  timestamp: string;
  total_campaigns: number;
  active_campaigns: number;
  paused_campaigns: number;
  completed_campaigns: number;
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  total_spend: number;
  avg_ctr: number;
  avg_cpc: number;
  avg_conversion_rate: number;
}

export interface CampaignInsights {
  timestamp: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  conversion_rate: number;
}

export interface GlobalInsightsResponse {
  insights: GlobalInsights;
}

export interface CampaignInsightsResponse {
  insights: CampaignInsights;
}

export const fetchGlobalInsights = async (): Promise<GlobalInsightsResponse> => {
  const response = await fetch(`${process.env.MIXO_API_URL}/campaigns/insights`, {
      method: 'POST',
      headers: {
          'accept': 'application/json'
      }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch global insights");
  }
  return response.json();
};

export const fetchCampaignInsights = async (id: string): Promise<CampaignInsightsResponse> => {
    const response = await fetch(`${process.env.MIXO_API_URL}/campaigns/${id}/insights`);
    if (!response.ok) {
        throw new Error("Failed to fetch campaign insights");
    }
    return response.json();
};
