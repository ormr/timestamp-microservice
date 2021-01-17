"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));
app.get('/', function (_req, res) {
    res.sendFile(__dirname + "/views/index.html");
});
app.get('/api/timestamp/:date?', function (req, res) {
    var date = req.params.date;
    if (!date) {
        return res.json({
            unix: Date.now(),
            utc: new Date().toUTCString()
        });
    }
    // if date in yyyy-mm-dd format then transform to number
    var formattedDate = isNaN(+date) ? +(new Date(date)) : +date;
    var unix = formattedDate;
    var utc = new Date(formattedDate).toUTCString();
    if (!unix || !utc || utc === 'Invalid Date') {
        return res.json({
            error: 'Invalid Date'
        });
    }
    return res.json({
        unix: unix,
        utc: utc
    });
});
var PORT = 9000;
app.listen(PORT, function () {
    console.log("[app]: Server started on http://localhost:" + PORT);
});
