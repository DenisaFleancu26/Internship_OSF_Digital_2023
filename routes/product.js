const express = require('express');
const router = express.Router();
const { findProduct, longDescriptionProduct } = require('../models/mongo/findProduct');
const { findCategoryName } = require('../models/mongo/findCategory');

router.get('/:category/:subcategory/:product', async function(req, res, next) {
  
  try{

    const product = await findProduct(req.params.product);
    res.locals.isSubcategoryPage = req.params.subcategory;
    res.locals.isCategoryPage = req.params.category;

    title = await findCategoryName(req.params.category);

    res.render('contentProductDetailPage', { 
      layout: 'layout', 
      title: product.name, 
      product: product, 
      isCategoryPage: res.locals.isCategoryPage, 
      isSubcategoryPage: res.locals.isSubcategoryPage, 
      isProductPage: product.id, 
      longDescription: await longDescriptionProduct(product), 
      subcategoryName: title
    });

  }catch(error){
    res.render('error', {
      layout: 'layout',
      title: 'Error',
      status: error.status, 
      message: error.message
    });
  }


    

   
  

});

module.exports = router;