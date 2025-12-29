"use client";

import Layout from "@/components/dashboard/dashboard-layout";
import { CampaignInsightsSection } from "@/components/dashboard/campaigns/campaign-insights-table";

const Page = () => {
  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-12">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Campaign Insights</h2>
        </div>
        <div className="space-y-4">
          <CampaignInsightsSection />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
