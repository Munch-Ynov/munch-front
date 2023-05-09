/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,vue}"],
  theme: {
    colors: {
      primary1: "#43978e",
      primary2: "#d35400",
      danger1: "#e74c3c",
      danger2: "#c0392b",
      success1: "#2ecc71",
      success2: "#27ae60",
      gray1: "#f6f6f6",
      gray2: "#d9d9d9",
      gray3: "#6f767e",
      textColor: "#000",
      white: "#fff",
      background: "#f5f5f5",
    },
    fontFamily: {
      sans: ["Nexa", "Roboto", "sans-serif"],
      nexa: ["Nexa", "Roboto", "sans-serif"],
      coco: ["Cocogoose", "Roboto", "sans-serif"],
      chunk: ["ChunkFive", "Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
