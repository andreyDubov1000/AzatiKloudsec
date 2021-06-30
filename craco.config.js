const CracoAlias = require("craco-alias");
const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.base.json",
      },
    },
  ],
  babel: {
    plugins: [
      [
        "babel-plugin-import",
        {
          libraryName: "@material-ui/core",
          libraryDirectory: "",
          camel2DashComponentName: false,
        },
        "core",
      ],
      [
        "babel-plugin-import",
        {
          libraryName: "@material-ui/icons",
          libraryDirectory: "",
          camel2DashComponentName: false,
        },
        "icons",
      ],
    ],
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
