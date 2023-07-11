var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('contentMainPage', { layout: 'layout', categories: null});
});

module.exports = router;
