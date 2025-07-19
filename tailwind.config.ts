import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'media',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Semantic text colors
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        
        // Surface colors
        surface: "var(--surface)",
        "surface-secondary": "var(--surface-secondary)",
        "surface-tertiary": "var(--surface-tertiary)",
        
        // Border colors
        "border-custom": "var(--border)",
        "border-input": "var(--border-input)",
        
        // Interactive colors
        "interactive-primary": "var(--interactive-primary)",
        "interactive-primary-hover": "var(--interactive-primary-hover)",
        "interactive-secondary": "var(--interactive-secondary)",
        "interactive-secondary-hover": "var(--interactive-secondary-hover)",
        
        // Status colors
        "status-warning": "var(--status-warning)",
        "status-warning-bg": "var(--status-warning-bg)",
        "status-success": "var(--status-success)",
        "status-success-bg": "var(--status-success-bg)",
        "status-error": "var(--status-error)",
        "status-error-bg": "var(--status-error-bg)",
      },
    },
  },
  plugins: [],
};
export default config;