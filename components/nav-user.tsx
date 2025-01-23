"use client";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CircleUserRound,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { handleLogout } from "@/actions";
import useStore from "@/lib/store";

const commonHoverClasses =
  "hover:bg-accent hover:text-foreground hover:border hover:rounded-md cursor-pointer";

const NavUser = ({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) => {
  const { isMobile } = useSidebar();
  const { session } = useStore();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={`${commonHoverClasses} data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground z-[9999]`}
            >
              <CircleUserRound />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Hello</span>
                <span className="truncate text-xs">
                  {session !== null ? session : user.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-background w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel
              className={`p-0 font-normal ${commonHoverClasses}`}
            >
              <div className="flex items-center gap-1 px-1 py-1.5 text-left text-sm">
                <CircleUserRound />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Hello</span>
                  <span className="truncate text-xs">
                    {session !== null ? session : user.name}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className={commonHoverClasses}>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className={commonHoverClasses}>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className={commonHoverClasses}>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className={commonHoverClasses}>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className={commonHoverClasses}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default NavUser;