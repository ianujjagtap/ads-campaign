"use client";

import Layout from "@/components/dashboard/dashboard-layout";
import { CampaignStats } from "@/components/dashboard/analytics/campaign-stats";

const Page = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Layout>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <div className="space-y-4">
            <CampaignStats />
          </div>
        </div>
      </Layout>
    </div>
  );  
};

export default Page;
