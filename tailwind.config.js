/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ash: {
          50: "#f6f4f2",
          100: "#e4dfd9",
          200: "#c5bdb3",
          300: "#9b9085",
          400: "#6e655c",
          500: "#4a423b",
          600: "#332d28",
          700: "#221e1a",
          800: "#151210",
          900: "#0b0908",
          950: "#050403",
        },
        ember: {
          400: "#ffb070",
          500: "#ff7a2a",
          600: "#e85a14",
          700: "#a83b08",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        display: ["Georgia", "Cambria", "serif"],
      },
      keyframes: {
        flicker: {
          "0%,100%": { opacity: "0.9" },
          "47%": { opacity: "0.65" },
          "53%": { opacity: "1" },
        },
        rise: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "20%": { opacity: "0.8" },
          "100%": { transform: "translateY(-110vh) translateX(var(--drift, 0px))", opacity: "0" },
        },
        fadein: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        flicker: "flicker 2.4s ease-in-out infinite",
        rise: "rise linear infinite",
        fadein: "fadein 350ms ease-out",
      },
    },
  },
  plugins: [],
};
