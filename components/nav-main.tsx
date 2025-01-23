"use client";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
// import { usePathname } from "next/navigation";


const commonClasses = {
  collapsible: "group/collapsible",
  chevron:
    "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 hover:bg-accent hover:text-foreground",
  subItem:
    "text-primary hover:bg-accent hover:text-foreground hover:border hover:rounded-md",
  link: "hover:bg-accent hover:text-foreground hover:border hover:rounded-md",
};

const NavMain = ({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) => {
  // const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // const isActive = pathname === item.url;
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className={commonClasses.collapsible}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}  className={commonClasses.subItem}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className={commonClasses.chevron} />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem
                        key={subItem.title}
                        className={commonClasses.subItem}
                      >
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={subItem.url}
                            className={commonClasses.link}
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default NavMain;