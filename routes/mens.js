var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.locals.isMensPage = true;
  
  res.render('', {layout:'layout', isMensPage: res.locals.isMensPage});
});

module.exports = router;