module.exports = {
  mode: 'development',
  target: 'electron-main',
  entry: "./main.ts",
  output: {
    filename: "main.js",
    path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack"s output.
  devtool: 'source-map',

  resolve: {
    // Add ".ts" and ".tsx" as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.ts$/, loader: "awesome-typescript-loader" },
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  watch: true,
  node: {
    __dirname: false,
    __filename: false
  }
};
