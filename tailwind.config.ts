import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "350px",
        sm: "420px",
        md: "600px",
        tab: "870px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1536px",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "4xxl": "2.5rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
      colors: {
        input: "var(--input)",
        ring: "var(--ring)",
        background: {
          DEFAULT: "var(--background)",
          transparent: "var(--background-transparent)",
        },
        foreground: "var(--foreground)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          hover: "var(--primary-hover)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border: {
          DEFAULT: "var(--border)",
          accent: "var(--border-accent)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(2deg)" },
        },
        drop: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        rotatetdiv: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spin: "spin 10s linear infinite",
        "wave-1": "wave 0.1s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-2": "wave 0.2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-3": "wave 0.3s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-4": "wave 0.4s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-5": "wave 0.5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-6": "wave 0.6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-7": "wave 0.7s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-8": "wave 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-9": "wave 0.9s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-10": "wave 1s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-11": "wave 1.1s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-12": "wave 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-13": "wave 1.3s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-14": "wave 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-15": "wave 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-16": "wave 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-17": "wave 1.7s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-18": "wave 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-19": "wave 1.9s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-20": "wave 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "wave-21": "wave 2.1s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        drop: "drop 2s infinite",
        rotatediv: "spinFast 1s linear infinite",
      },
  
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
