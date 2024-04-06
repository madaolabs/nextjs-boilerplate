import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/client/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fff",
        secondary: "#005741",
        disabled: "#575757",
        contrast: "#000",
      },
      borderColor: {
        primary: "#005741",
        secondary: "#fff",
      },
      outlineColor: {
        primary: "#005741",
        secondary: "#fff",
      },
      backgroundColor: {
        primary: "#005741",
        secondary: "#717171",
        main: "#000",
        card: "#181A1F",
        disabled: "#717171",
        contrast: "#fff",
        mask: "rgba(0, 0, 0, 0.61)",
      },
    },
  },
  plugins: [],
};
export default config;
