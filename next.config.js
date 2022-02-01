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
    return config;
  },
};

module.exports = nextConfig;
