export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        submitEase: {
          primary: "#2563eb", // bleu
          secondary: "#7c3aed", // violet
          accent: "#16a34a", // vert
          neutral: "#3d4451",
          "base-100": "#ffffff",
          info: "#0ea5e9",
          success: "#22c55e",
          warning: "#facc15",
          error: "#ef4444",
        },
      },
      "light", // facultatif si tu veux hériter de base
    ],
  },
};
