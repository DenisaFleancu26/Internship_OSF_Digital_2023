var express = require('express');
var router = express.Router();
var GetValue = require('../../soap/getvalue');

router.get('/:currency', async function(req, res, next) {
  
    try {
        const date = new Date(); 
        const currency = req.params.currency; 
    
        const value = await GetValue.GetValueCurrency(date.toISOString(), currency);
        console.log(`The value for ${currency} on ${date} is: ${value}`);
    
      } catch (error) {
        res.status(500).send('An error occurred');
      }

});

  module.exports = router;