import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0B1020",
        "dark-alt": "#111827",
        accent: {
          blue: "#00C2FF",
          purple: "#6D5EF3",
          silver: "#FFFFFF"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syncopate', 'sans-serif']
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
