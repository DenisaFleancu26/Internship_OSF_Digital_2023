let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('contentMainPage', { 
    layout: 'layout', 
    title: "Home", 
    categories: null
  });
});

module.exports = router;
