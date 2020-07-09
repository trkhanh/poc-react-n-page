/* eslint-env node */

/**
 * @author: khanhtran
 * @date: 2019-10-10
 */


const express = require('express')
const app = express()
const port = 3000
var compression = require("compression");


app.use(compression());

app.use(express.static("./build"));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
