import tw, {
  backgroundImage,
  gradientColorStops,
} from "src/elf-tailwindcss-classnames";

export const brandedBlueGradientBackgroundClassName = tw(
  backgroundImage("bg-gradient-to-br"),
  gradientColorStops("from-principalBlue", "to-yieldBlue"),
);
