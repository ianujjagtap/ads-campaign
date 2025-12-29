import Layout from "@/components/dashboard/dashboard-layout";
import { CampaignDataTable } from "@/components/dashboard/campaigns/campaign-table";

const Page = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Layout>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-12">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">All Campaigns</h2>
          </div>
        <div className="flex items-center justify-center">
            <CampaignDataTable />
          </div>
        </div>
      </Layout>
    </div>
  );  
};

export default Page;
