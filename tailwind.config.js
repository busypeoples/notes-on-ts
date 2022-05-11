module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        move1: {
          "0%": {
            transform: "scale(0.1)",
          },
          "60%": {
            transform: "scale(1.3)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        move2: {
          "0%": {
            transform: "translateX(-80px)",
          },
          "60%": {
            transform: "translateX(30px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        move2Inverse: {
          "0%": {
            transform: "translateX(100px)",
          },
          "60%": {
            transform: "translateX(-20px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        move1: "move1 1s ease-in-out",
        move2: "move2 1s ease-in-out",
        move2Inverse: "move2Inverse 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
