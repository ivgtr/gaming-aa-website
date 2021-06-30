module.exports = {
  extends: [
    "eslint-config-sumikko",
    "eslint-config-sumikko/ts",
    "eslint-config-sumikko/react",
    "eslint-config-sumikko/prettier",
  ],
  rules: {
    "arrow-body-style": 0,
    "react/display-name": 0,
  },
};
