const path = require("path");
// const styledComponentsPlugin = require('babel-plugin-styled-components');

module.exports = {
  entry: path.resolve(__dirname,  "src/index.js"),

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["babel-plugin-styled-components"],
          },
        },
      },
    ],
  },


  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};