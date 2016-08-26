var express = require('express');
var router = express.Router();

var sleep = function(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
};

router.post(
    '/',
    function(req, res, next) {
        console.log('start: ' + new Date().toTimeString());
        console.log(req.body);
        next();
    },
    function(req, res, next) {
        // sleep(600000);
        console.log('end: ' + new Date().toTimeString());
        res.status(200).json({
            status: 1,
            message: new Date().toTimeString() + ' Mocked release server always return failed!'
        });
    });

module.exports = router;
