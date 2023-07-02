/* eslint-disable */
const path = require("path");

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      "@": resolvePath("src"),
      "@components": resolvePath("src/components"),
      "@styles": resolvePath("src/styles"),
      "@pages": resolvePath("src/pages"),
      "@router": resolvePath("src/router"),
      "@helpers": resolvePath("src/helpers"),
      "@api": resolvePath("src/api")
    },
  },
};
