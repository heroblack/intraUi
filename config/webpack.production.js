const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const basePath = __dirname;
const indexInput = "src/template/index.html";
const indexOutput = "index.html";
const distPath = "dist";
/* npx webpack  --entry ./index.js  --output ./bundle.js --mode development */
module.exports = {
  entry: {
    home: path.resolve(basePath, "src/js/index.js")
    //precio: path.resolve(basePath, "../src/js/precio.js"),
    //contacto: path.resolve(basePath, "../src/js/contacto.js")
  },
  mode: "production",
  output: {
    path: path.resolve(basePath, distPath),
    filename: "js/[name].js" /*nombre de bundel */
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.(jpg|png|gif|woff|eot|ttf|svg|mp4|webm)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 90000
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },

          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      },

      {
        test: /\.less$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader
          // },
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "less-loader"
        ]
      },

      {
        test: /\.scss$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader
          // },
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "sass-loader"
        ]
      },

      {
        test: /\.styl$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader
          // },
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "stylus-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: "plugins",
      template: path.resolve(basePath, indexInput),
      filename: indexOutput,
      chunks: ["home"],
      templateParameters: {
        titulo: "Portafolio",
        encabezamiento: "Hola Mundo desde Webpack"
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/[hash][name].css",
      chunkFilename: "css/[id].css"
    }),

    new webpack.DllReferencePlugin({
      manifest: require("./modules-manifest")
    })
  ]
};
