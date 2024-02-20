import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens:{
        'desktop': '1440px',
        'laptop': '1280px',
        'tablet1': '820px',
        'tablet2': '640px',
        'mobile1': '430px',
        'mobile2': '320px',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        'clampHero': 'clamp(320px, 100%, 1200px)',
        'clampHeroBody': 'clamp(320px,100%, 328px)',
        'sliderHero':'clamp(280px, 100%, 792px)'
      },
      height: {
        'heightHero': 'clamp(414px, 100%, 588px)',
        'sliderHero': 'clamp(218px, 100%, 526px)'

      },
      colors: {
        'buttonPrimary': '#E57820',
        'surfaceContainer': '#B3C3CB'
      }
    },
  },
  plugins: [],
};
export default config;
