var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('Mocked endpoint for orp!');
});

router.post(
    '/operationmenu/jsonapi/createOrpOperationMenu',
    function(req, res, next) {
      console.log(req.body);
      next();
    },
    function(req, res, next) {
      res.status(200).json({
        error: 0,
        errmsg: 'success',
        url: 'http://orp.baidu.com/operationmenuui/menuinfo?menuId=115780'
      });
    });

module.exports = router;
