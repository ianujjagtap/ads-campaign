import { 
  CampaignsResponse, 
  CampaignDetailResponse, 
  GlobalInsightsResponse, 
  CampaignInsightsResponse 
} from "@/types/campaign";

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
