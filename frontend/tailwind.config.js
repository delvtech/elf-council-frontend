module.exports = {
  // allows tailwind to tree shake all css not included in the files found in this array.
  purge: [
    // .ts allow for long tailwind classes to be extract to their own files.
    "./pages/**/*.ts",
    "./pages/**/*.tsx",
    // .ts allow for long tailwind classes to be extract to their own files.
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Used this tool for color variants: https://material.io/resources/color
        brandLightBlue: {
          light: "#acffff",
          DEFAULT: "#78D3E2",
          dark: "#42a2b0",
        },
        brandDarkBlue: {
          light: "#588bf1",
          DEFAULT: "#005EBE",
          dark: "#00368d",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
