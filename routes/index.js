var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('contentMainPage', { 
    layout: 'layout', 
    title: "Home", 
    categories: null
  });
});

module.exports = router;
