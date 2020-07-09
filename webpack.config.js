/* eslint-env node */

/**************************
 * @file: webpac
 * @author: khanhtran
 * @date: 2019-10-08
 * @update: 2019-11-04
 ***************************/

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");//js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //css
const createHtml = require("./config/create-html");// html
const getEntry = require("./config/get-entry");
const entry = getEntry("./src/pages");
const htmlArr = createHtml("./src/pages");

module.exports = (env, argv) => ({
	entry: entry,
	output: {
		path: path.join(__dirname, "build"),
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react",
							{ "plugins": ["@babel/plugin-proposal-class-properties"] }
						],
					}
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
				exclude: /node_modules/,
			},
			{
				test: /\.(scss|css)$/, //css plugins
				use: [
					argv.mode == "development" ? { loader: "style-loader" } : MiniCssExtractPlugin.loader,
					{ loader: "css-loader", options: { url: false, sourceMap: true } },
					{ loader: "sass-loader", options: { sourceMap: true } }
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
				options: {
					publicPath: '/'
				}
			},

		],
	},
	devServer: {
		port: 3100,
		open: true,
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, "src/"),
			component: path.resolve(__dirname, "src/component/"),
			store: path.resolve(__dirname, "src/store/"),
		}
	},
	plugins: [
		...htmlArr, // html
		new MiniCssExtractPlugin({ //css
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
	],
	optimization: {
		minimizer: [//js
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: false
			}),
			new OptimizeCSSAssetsPlugin({})
		],
		splitChunks: { //css
			cacheGroups: {
				styles: {
					name: "styles",
					test: /\.css$/,
					chunks: "all",
					enforce: true
				}
			}
		}
	}
});
