var express = require('express');
var router = express.Router();

/* GET product detail page */
router.get('/:category/:subcategory/:product', async function(req, res, next) {
  
    res.render('', { layout: 'layout' });
    
  });

module.exports = router;