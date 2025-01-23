import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Provider from "@/components/theme-kits/theme-provider";


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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
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
