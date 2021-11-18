module.exports = {
  mode: "jit",
  purge: ["./public/index.html"],
  darkMode: "media",
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["even"],
    },
  },
  plugins: [],
};
