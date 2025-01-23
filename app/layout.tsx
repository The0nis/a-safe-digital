import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
// import Provider from "@/components/theme-kits/theme-provider";
import dynamic from "next/dynamic";

const Provider = dynamic(() => import("@/components/theme-kits/theme-provider"));


export const metadata: Metadata = {
  title: "A-Safe Digital",
  description: "A-Safe Digital",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
       
      </head>
      <body className={cn("bg-background text-primary scroll-smooth", inter.className)}>
        <Provider>
          <Toaster position="bottom-right" richColors />
          {children}
        </Provider>
      </body>
    </html>
  );
}
