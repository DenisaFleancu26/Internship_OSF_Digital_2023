const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('contentMainPage', { 
    layout: 'layout', 
    title: "Home", 
    categories: null
  });
});

module.exports = router;
