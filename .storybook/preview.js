import "../styles/globals.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  colorPalettes: {
    palettes: [
      {
        name: "Element colors", // string
        palette: {
          // See tailwind.config.js for all the custom colors
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
        },
      },
    ],
  },
  backgrounds: {
    default: "Light",
    values: [{ name: "Light", value: "#FAF9F9" }],
  },
};
