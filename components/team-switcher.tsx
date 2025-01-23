"use client";
import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Logo from "@/assets/logo";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const commonHoverClasses =
  "hover:bg-accent hover:text-foreground hover:border hover:rounded-md";
const commonButtonClasses =
  "flex size-6 items-center justify-center rounded-md border";

 const TeamSwitcher= ({
  teams,
}: {
  teams: {
    name: string;
    // logo: React.ElementType
    plan: string;
  }[];
}) =>  {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="bg-background data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground text-primary"
            >
              <div
                className={`${commonHoverClasses} flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground`}
              >
                {/* <activeTeam.logo className="size-4" /> */}
                <Logo width="w-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-background w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className={`${commonHoverClasses} gap-2 p-2 z-[99999] cursor-pointer`}
              >
                <div className={`${commonButtonClasses} rounded-sm`}>
                  {/* <team.logo className="size-4 shrink-0" /> */}
                  <Logo width="w-4" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={`${commonHoverClasses} p-2 cursor-pointer`}
            >
              <div className={`${commonButtonClasses} bg-background`}>
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}


export default TeamSwitcher;