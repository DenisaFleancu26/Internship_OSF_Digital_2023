const express = require('express');
const router = express.Router();
const { GetValueAdvCurrency } = require('../models/soap/getvalueadv');

router.get('/', async function(req, res, next){

    if(req.query.currency){
        try {
            const currency = req.query.currency;
            const date = new Date();
            const price = await GetValueAdvCurrency(date.toISOString(), currency);
            
            res.json({"value": price.value})
            
        }catch(error){
            res.render('error', {
                layout: 'layout',
                title: 'Error',
                status: error.status, 
                message: error.message
            });
        }
    }else{
        next();
    }

});

module.exports = router;
