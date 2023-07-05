const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shop',(err) => {
    if(!err){
        console.log("Database connected successfully");
    }else{
        console.log("Error:" + err); 
    }
});

const Products = require('../models/product');

module.exports = Products;

