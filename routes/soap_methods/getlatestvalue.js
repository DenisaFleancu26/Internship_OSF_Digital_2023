let express = require('express');
let router = express.Router();
let GetLatestValue = require('../../models/soap/getlatestvalue');

router.get('/:currency', async function(req, res, next) {
  
    try {
        const currency = req.params.currency; 
    
        const value = await GetLatestValue.GetLatestValueCurrency(currency);
        console.log(`The value for ${currency} is: ${value}`);
    
    } catch (error) {
        res.status(500).send('An error occurred');
    }

});

  module.exports = router;