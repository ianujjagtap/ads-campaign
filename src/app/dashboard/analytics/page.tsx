"use client";

import Layout from "@/components/dashboard/dashboard-layout";
import { Label } from "@/primitives/label";

const page = () => {
  return (
    <div>
      <Layout>
        <div className="m-4 space-y-4">
          <Label className="text-2xl">Manage Application Links</Label>
          <div className="flex flex-col gap-4 pt-4 lg:flex-row lg:items-start">
            <div className="w-full lg:w-1/3">
              "Hello"
            </div>
            <div className="w-full lg:w-2/3">
              "Hello"
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default page;
