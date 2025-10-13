/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // We are changing the default 'sans' font to 'Caveat'
        sans: ["Caveat", "cursive"], 
      },
      colors: {
        background: "#0A0F19", // Deep Space Blue
        primary: "#111827",    // Dark Slate
        secondary: "#1F2937",   // Lighter Slate
        accent: "#9CA3AF",      // Muted Gray
        text: "#F9FAFB",        // Off-White
        highlight: "#E6007A",   // Vibrant Magenta
        creamm: "#e9eae8",
      },
    },
  },
  plugins: [],
};