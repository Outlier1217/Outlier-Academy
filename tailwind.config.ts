import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E1116",
        surface: "#151A21",
        surface2: "#1B222B",
        border: "#2A323D",
        paper: "#E9E6DE",
        muted: "#8B93A1",
        amber: "#E8B84B",
        teal: "#4FD1C5",
        error: "#E06C5C",
      },
      fontFamily: {
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        sans: ["var(--font-plex)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
