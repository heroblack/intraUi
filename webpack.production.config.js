const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
/* npx webpack  --entry ./index.js  --output ./bundle.js --mode development */
module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/js/index.js")
    //precio: path.resolve(__dirname, "../src/js/precio.js"),
    //contacto: path.resolve(__dirname, "../src/js/contacto.js")
  },
  //mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[hash].dll.js" /*nombre de bundel */,
    publicPath: "http://localhost:3001/",
    chunkFilename: "js/[id].[hash].js"
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
            limit: 1000,
            name: "[hash].[ext]",
            outputPath: "assets"
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
    new HtmlWebpackPlugin({
      hash: true,
      title: "plugins",
      template: path.resolve(__dirname, "public/index.html"), // path.resolve(__dirname, indexInput),
      chunks: ["app"],
      filename: "index.html",
      templateParameters: {
        titulo: "Portafolio",
        encabezamiento: "Hola Mundo desde Webpack"
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[id].[hash].css"
    }),

    new webpack.DllReferencePlugin({
      manifest: require("./modules-manifest")
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, "dist/js/*.dll.js"),
      outputPath: "js",
      publicPath: "http://localhost:3001/js"
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/app.*"]
    })
  ],
  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()]
  }
};
