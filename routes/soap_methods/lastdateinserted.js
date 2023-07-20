var express = require('express');
var router = express.Router();
var LastDateInserted = require('../../soap/lastdateinserted');

router.get('/', async function(req, res, next) {
  
    try {
        const date = await LastDateInserted.LastDateInsertedCurrency();
        console.log(`Last date insered: ${date}`);
    } catch (error) {
        res.status(500).send('An error occurred');
    }

});

  module.exports = router;