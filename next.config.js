const svgrTemplate = require("./svgr-template");

const nextConfig = {
  eslint: {
    dirs: ["pages", "src"],
  },
  webpack: (config) => {
    // https://github.com/a16z/zkp-merkle-airdrop-fe-ex#notes
    config.resolve.fallback = {
      fs: false,
      stream: false,
      path: false,
      crypto: false,
      os: false,
      http: false,
      https: false,
    };
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      // https://react-svgr.com/docs/webpack/#use-svgr-and-asset-svg-in-the-same-project
      oneOf: [
        // To import an svg as a url (to be used as an img src), add ?url to
        // the end of the import path.
        // Example:
        //   import sampleIconSrc from "path/to/sampleIcon.svg?url"
        //   <Image src={sampleIconSrc}
        {
          resourceQuery: /url/,
          type: "asset",
        },
        {
          loader: "@svgr/webpack",
          // https://react-svgr.com/docs/options/
          options: {
            template: svgrTemplate,
            svgo: true,
            // https://github.com/svg/svgo#configuration
            svgoConfig: {
              plugins: [{ name: "removeViewBox", active: false }],
            },
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
