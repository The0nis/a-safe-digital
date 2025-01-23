import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ThemeSwitcher from "@/components/theme-kits/ThemeSwicher";
import ThemeSwitch from "@/components/theme-kits/ThemeSwich";
import Loading from "@/loading";

// import { ModeToggle } from "@/components/theme-kits/toggle-ui";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="w-full relative">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between shadow-sm fixed bg-background z-[10] w-full px-4 text-primary">
              <div className="flex items-center gap-2 w-full">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block ">
                      <BreadcrumbLink
                        href="#"
                        className="text-muted-foreground hover:text-primary"
                      >
                        Management Console
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block text-primary" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-primary">
                        Admin
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="w-fit flex items-end justify-end p-4  top-0 right-0 z-[99999] fixed">
              <ThemeSwitch />
            </div>
          </div>
          <Suspense fallback={<Loading />}>
            <div className="px-4 z-1 mt-[5rem] pb-10">{children}</div>
          </Suspense>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
