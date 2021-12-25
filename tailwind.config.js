module.exports = {
  // allows tailwind to tree shake all css not included in the files found in this array.
  content: [
    // .ts allow for long tailwind classes to be extract to their own files.
    "./pages/**/*.ts",
    "./pages/**/*.tsx",
    // .ts allow for long tailwind classes to be extract to their own files.
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        // Colors taken from:
        // https://www.figma.com/file/SRw9lvgMAasN5JaQrK0z4t/Governance?node-id=1040%3A1303
        yieldBlue: "#1568CA",
        denimBlue: "#7FBEEA",
        principalBlue: "#6ACDE2",
        principalRoyalBlue: "#005EBE",
        orange:"#ff4700",
        lightOrange:"#ffe7de",
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
        statusRed: "#FAEAEA",
        hackerSky: "#F1F5FE",
        appBackgroundLight: "#FAF9F9",

        // Deprecated colors:
        // Used this tool for color variants: https://material.io/resources/color
        brandLightBlue: {
          light: "#acffff",
          DEFAULT: "#78D3E2",
          dark: "#42a2b0",
        },
        brandDarkBlue: {
          light: "#588bf1",
          // Deprecated: use principalRoyalBlue instead
          DEFAULT: "#005EBE",
          dark: "#00368d",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
