"use client";

import { ThemeProvider } from "next-themes";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider disableTransitionOnChange defaultTheme="dark-zinc">
      {children}
    </ThemeProvider>
  );
}

export default Provider;