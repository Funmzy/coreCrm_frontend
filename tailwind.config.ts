import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          "75Line": "#23232E",
          75: "#6c757d",
          70: "#282836",
          40: "#79798C",
          10: "#F2F2F5",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
