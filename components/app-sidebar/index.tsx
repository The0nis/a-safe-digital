"use client";

import NavMain from "@/components/nav-main";
import NavProjects from "@/components/nav-projects";
import NavUser from "@/components/nav-user";
import TeamSwitcher from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { data } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="text-primary bg-background"
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="flec flec-col gap-1">
          {data.overview.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenu
                className="group-data-[collapsible=icon]:hidden"
                key={item.title}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-accent hover:text-foreground ${
                        isActive ? "bg-accent text-foreground" : ""
                      }`}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            );
          })}
        </SidebarGroup>

        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
