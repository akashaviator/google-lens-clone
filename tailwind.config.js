/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite", // Default duration for twinkle
      },
      keyframes: {
        twinkle: {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "50%": { opacity: "1", transform: "scale(1.2)" }, // Slightly increase size for twinkle effect
          "100%": { opacity: "0", transform: "scale(0.5)" },
        },
      },
    },
  },
  plugins: [],
}
