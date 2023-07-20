var express = require('express');
var router = express.Router();
var GetValueAdv = require('../../soap/getvalueadv');

router.get('/:currency', async function(req, res, next) {
  
    try {
        const date = new Date();
        const currency = req.params.currency;
    
        const { value, data, moneda } = await GetValueAdv.GetValueAdvCurrency(date.toISOString(), currency);
        console.log(`The value for ${moneda} on ${data} is: ${value}`);
      } catch (error) {
        res.status(500).send('An error occurred');
      }

});

  module.exports = router;