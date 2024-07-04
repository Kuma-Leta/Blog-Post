module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      extend: {
        animation: {
          fadeInDown: "fadeInDown 1s ease-out",
          fadeInUp: "fadeInUp 1s ease-out",
          spinSlow: "spin 10s linear infinite",
          bounce: "bounce 2s infinite",
          pulse: "pulse 2s infinite",
        },
        keyframes: {
          fadeInDown: {
            "0%": { opacity: 0, transform: "translateY(-20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
          fadeInUp: {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
          backgroundImage: {
            noise:
              'url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"%3E%3Cg fill="%23ffffff" fill-opacity="0.04"%3E%3Ccircle cx="400" cy="400" r="400"/%3E%3C/g%3E%3C/svg%3E\')',
          },
        },
      },
    },
  },
  plugins: [],
};
