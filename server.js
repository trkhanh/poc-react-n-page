/* eslint-env node */

/**
 * @author: khanhtran
 * @date: 2019-10-10
 */

var express = require("express");
var app = express();
var http = require("http");
var port = "3030";

const opn = require("opn");

var compression = require("compression");
app.use(compression());

app.use(express.static("./build"));
app.set("port", port);

var server = http.createServer(app);
server.listen(port);

server.on("listening", onListening);

function onListening() {
	console.log(`server port 3118 listening and open browser with http://localhost:${port}....`);
	opn(`http://localhost:${port}`, "chrome");
}
