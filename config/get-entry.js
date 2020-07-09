/* eslint-env node */
/**
 * @author: khanhtran
 * @date: 2019-10-11
 * @update: 2019-11-04
 */
const getPath = require("./get-path");
/**
 *
 * @param {String} path 
 * @returns {Object} entry { "about/about":"./src/about/about.js",...}
 */
module.exports = function getEnty(path) {
	let entry = {};
	getPath(path).map((item) => {
		entry[`${item}/${item}`] = `${path}/${item}/index.js`;
	});
	return entry;
};
