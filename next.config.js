// eslint-disable-next-line no-undef
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ttf$/,
      type: "asset/inline",
    });
    return config;
  },
};
