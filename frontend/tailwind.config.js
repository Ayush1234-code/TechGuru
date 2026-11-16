export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(59, 130, 246, 0.24)",
        violet: "0 24px 80px rgba(124, 58, 237, 0.24)"
      }
    }
  },
  plugins: []
};
