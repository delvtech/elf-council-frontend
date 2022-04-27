import * as NextImage from "next/image";
import { addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import "../styles/globals.css";

// Chromatic storybook testing doesn't work well with the default optimized images from next/image.
// Rather than accounting for this in each component, we'll just override next/image import
// and force all consumers to be default unoptimized when storybook runs.
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

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

addDecorator(withA11y);
