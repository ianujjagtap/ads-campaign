"use client";

import { RouteConfig } from "@/config/routes";      
import { ScrollArea } from "@/primitives/scrollarea";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/primitives/sidebar";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-background">
        <div className="flex h-16 items-center justify-center bg-background pb-5">
          <Link href={"/dashboard/analytics"}>
            ADS CAMPAIGN
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <ScrollArea className="h-full">
          <SidebarGroup>
            <SidebarGroupLabel>Sections</SidebarGroupLabel>
            <SidebarMenu>
              {RouteConfig.map((item : any) => (
                <SidebarMenuItem key={item?.title}>
                    <Link href={item?.url || "#"}>
                      <SidebarMenuButton
                        tooltip={item?.title}
                        className="cursor-pointer hover:bg-secondary"
                      >
                        {item?.icon && <item.icon />}
                        <span>{item?.title}</span>
                      </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
