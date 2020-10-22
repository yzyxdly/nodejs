var express = require('express');
var router = express.Router();

/* return code */
router.all(
    '/:code',
    function(req, res, next) {
      console.log(new Date())
      console.log('body==========')
      console.log(req.body);
      next();
    },
    function(req, res, next) {
      res.status(req.params.code).json({
        status: req.params.code
      });
    });

module.exports = router;
