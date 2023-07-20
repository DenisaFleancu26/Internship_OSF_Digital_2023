let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  res.render('contentMainPage', { 
    layout: 'layout', 
    title: "Home", 
    categories: null
  });
});

module.exports = router;
