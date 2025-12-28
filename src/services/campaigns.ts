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

export const fetchCampaigns = async (): Promise<CampaignsResponse> => {
  const response = await fetch(`${process.env.MIXO_API_URL}/campaigns`);
  if (!response.ok) {
    throw new Error("Failed to fetch campaigns");
  }
  return response.json();
};
