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
      animation: {
        slideIn: 'slideIn 0.25s ease-in-out 0s 1 forwards',
      },
      colors: {
        // Colors taken from:
        // https://www.figma.com/file/SRw9lvgMAasN5JaQrK0z4t/Governance?node-id=1040%3A1303
        yieldBlue: "#1568CA",
        yieldLightBlue: "#75C7EE",
        denimBlue: "#7FBEEA",
        principalBlue: "#6ACDE2",
        principalRoyalBlue: "#005EBE",
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
        textGrey: "#979797",

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
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        }
      },
      borderRadius: {
        regular: "10px",
      },
      padding: {
        btn: "10px 20px"
      },
      boxShadow: {
        btn: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        btnAccent: "0px 6px 10px rgba(0, 0, 0, 0.3)",
      },
      fontSize: {
        xxs: "12px",
        l22: "22px",
        l28: "28px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
