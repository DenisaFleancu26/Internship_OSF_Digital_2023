var express = require('express');
var router = express.Router();

/* GET product detail page */
router.get('/:category/:subcategory/:product', async function(req, res, next) {
  
  const ProductModel = require('../models/product');
  const product = await ProductModel.findOne({id: req.params.product});

  if(!product){

    next({ status: 404, message: 'Oops, This Page Not Found!'});

  }else{

    res.locals.isSubcategoryPage = req.params.subcategory;
    res.locals.isCategoryPage = req.params.category;

    if(product.short_description === product.long_description){
      longDescription = false;
    }else{
      longDescription = true;
    }

    res.render('contentProductDetailPage', { layout: 'layout' , product: product, isCategoryPage: res.locals.isCategoryPage, isSubcategoryPage: res.locals.isSubcategoryPage, longDescription: longDescription});
  }

});

module.exports = router;