module.exports = {
  // allows tailwind to tree shake all css not included in the files found in this array.
  purge: {
    // see https://github.com/tailwindlabs/tailwindcss/discussions/2963#discussioncomment-145462
    enabled: true,
    content: ["./pages/**/*.tsx", "./src/**/*.tsx"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
