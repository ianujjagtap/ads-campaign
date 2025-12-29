import { ChartNoAxesColumnIncreasing, ListTodo } from "lucide-react";

export const RouteConfig = [
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    title: "All Campaigns",
    url: "/dashboard/all-campaigns",
    icon: ListTodo,
  },
  {
    title: "Campaign Insights",
    url: "/dashboard/campaign-insights",
    icon: ChartNoAxesColumnIncreasing, // Using valid icon, user suggested LineChart but imports are here. reusing existing or adding new? existing imports has ChartNoAxesColumnIncreasing. Let's use LineChart if available or just duplicate for now. User said "LineChart or similar".
  }
];
