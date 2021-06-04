const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: "./src",
        // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
        tsConfigPath: "./tsconfig.extend.json",
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
};
