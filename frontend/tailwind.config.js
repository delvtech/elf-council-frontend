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
        // Colors taken from:
        // https://www.figma.com/file/SRw9lvgMAasN5JaQrK0z4t/Governance?node-id=1040%3A1303
        yieldBlue: "#1568CA",
        denimBlue: "#7FBEEA",
        principalBlue: "#6ACDE2",
        clay: "#242E36",
        black: "#1B1D21",
        blueGrey: "#B2CAE3",
        paleLily: "#D1ECF1",
        votingGreen: "#CDFFCD",
        deepRed: "#F73030",
        indianYellow: "#E1AF55",
        topaz: "#19C2A3",
        goldYellow: "#FFC300",
        statusGreen: "#007F00",

        // Deprecated colors:
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
