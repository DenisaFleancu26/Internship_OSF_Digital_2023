var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.locals.isWomensPage = true;
  
  res.render('', {layout:'layout', isWomensPage: res.locals.isWomensPage});
});

module.exports = router;
