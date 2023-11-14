/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-border": "rgb(var(--primary-border))",

        "primary-background": "rgb(var(--primary-background))",
        "secondary-background": "rgb(var(--secondary-background))",

        "overlay": "rgba(var(--overlay))",

        "primary-text": "rgb(var(--primary-text))",
        "secondary-text": "rgb(var(--secondary-text))",

        "primary-button": "rgb(var(--primary-button))",
        "primary-button-hover": "rgb(var(--primary-button-hover))",
      }
    },
  },
  plugins: [],
}