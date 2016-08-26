var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('Mocked endpoint for eden!');
});

router.post(
    '/edenBus/call/OnlineModuleVersion',
    function(req, res, next) {
      console.log(req.body);
      next();
    },
    function(req, res, next) {
      res.status(200).json({
        errorcode: 0,
        status: 'ok',
        url: 'http://eden.baidu.com?menuId=123'
      });
    });

module.exports = router;
