/**
 * @author:khanhtran
 * @date: 2019-10-09
 * @update: 2019-11-05
 */

const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getPath = require("./get-path");
let htmlArr = [];
function createHtml(page_path) {
	getPath(page_path).map((item) => {
		let infoJson = {}, infoData = {};
		try {
			infoJson = fs.readFileSync(`${page_path}/${item}/pageinfo.json`, "utf-8");//
			infoData = JSON.parse(infoJson);
		} catch (err) {
			infoData = {};
		}
		htmlArr.push(new HtmlWebpackPlugin({
			title: infoData.title ? infoData.title : "webpack,react",
			meta: {
				keywords: infoData.keywords ? infoData.keywords : "webpack，react，github",
				description: infoData.description ? infoData.description : "webpack，reac"
			},
			chunks: [`${item}/${item}`],
			template: "./src/template.html",
			filename: item == "index" ? "index.html" : `${item}/index.html`,
			minify: {
				collapseWhitespace: true,
				preserveLineBreaks: true
			},
		}));
	});
	return htmlArr;
}


module.exports = createHtml;
