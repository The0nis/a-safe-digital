"use client";

import { cn } from "@/lib/utils";
import { Moon, Paintbrush, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import DropdownProvider from "./dropDown-provider";
import { Button } from "../ui/button";

const themes: ThemeType = {
  light: [
    { name: "zinc", color: "bg-zinc-100" },
    { name: "orange", color: "bg-orange-500" },
    { name: "red", color: "bg-red-500" },
    { name: "blue", color: "bg-blue-500" },
    { name: "green", color: "bg-green-500" },
  ],
  dark: [
    { name: "zinc", color: "bg-zinc-950" },
    { name: "orange", color: "bg-orange-500" },
    { name: "red", color: "bg-red-500" },
    { name: "blue", color: "bg-blue-500" },
    { name: "green", color: "bg-green-500" },
  ],
};

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mode") || "dark";
    }
    return "";
  });
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const handleModeChange = (newMode: "light" | "dark") => {
    const selectedTheme = theme?.split("-")[1];
    const newTheme = `${newMode}-${selectedTheme}`;
    setMode(newMode);
    setTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <DropdownProvider>
      <DropdownMenu>
        <DropdownMenuTrigger data-id="theme-switch-trigger">
          <Paintbrush className="text-accent " />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          sideOffset={10}
          className="shadow-lg mt-5 rounded-md p-2 !bg-background "
          data-id="theme-switch-content"
        >
          <div className="font-bold text-base" data-id="theme-switch-title">Customize Theme</div>
          <DropdownMenuLabel data-id="theme-switch-mode-label">Mode</DropdownMenuLabel>
          <DropdownMenuItem data-id="theme-switch-mode-item">
            <Button
              className={cn(
                "flex items-center gap-x-2 py-1 px-3 rounded-md text-sm border border-muted bg-background  transition hover:bg-accent hover:text-foreground",
                mode === "light"
                  ? "border-2 border-border"
                  : "text-muted-foreground "
              )}
              variant={"outline"}
              onClick={() => handleModeChange("light")}
              data-id="theme-switch-light-button"
            >
              <Sun className="w-5 h-5 shrink-0" />
              Light
            </Button>
            <Button
              className={cn(
                "flex items-center gap-x-2 py-1 px-3 rounded-md text-sm border border-muted bg-background transition hover:bg-accent hover:text-foreground",
                mode === "dark"
                  ? "border-2 border-border"
                  : "text-muted-foreground"
              )}
              variant={"outline"}
              onClick={() => handleModeChange("dark")}
              data-id="theme-switch-dark-button"
            >
              <Moon className="w-5 h-5 shrink-0" />
              Dark
            </Button>
          </DropdownMenuItem>
          <DropdownMenuLabel data-id="theme-switch-colors-label">Colors</DropdownMenuLabel>
          <DropdownMenuItem data-id="theme-switch-colors-item">
            {themes[mode as keyof ThemeType]?.map((themeOption) => (
              <Button
                key={themeOption.name}
                onClick={() => setTheme(mode + "-" + themeOption.name)}
                className={cn(
                  "flex items-center gap-x-2 border border-muted py-1 px-2 rounded-md text-sm text-foreground hover:bg-background transition ease-in",
                  theme === mode + "-" + themeOption.name &&
                    "border-2 border-border"
                )}
                data-id={`theme-switch-color-button-${themeOption.name}`}
              >
                <div
                  className={`w-4 h-4 rounded-full border shrink-0 ${themeOption.color}`}
                />
                {themeOption.name}
              </Button>
            ))}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </DropdownProvider>
  );
}

export default ThemeSwitch;