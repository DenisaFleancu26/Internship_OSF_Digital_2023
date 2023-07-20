const express = require('express');
const router = express.Router();
const { findCategoryName } = require('../models/mongo/findCategory');
const { findSubcategoryProducts } = require('../models/mongo/findSubcategoryProducts');
let title = '';

router.get('/:category/:subcategory', async function(req, res, next){

    try{
      const products = await findSubcategoryProducts(req.params.subcategory);
      title = await findCategoryName(req.params.category, req.params.subcategory);

      res.locals.isSubcategoryPage = req.params.subcategory;
      res.locals.isCategoryPage = req.params.category;

      res.render('contentSubcategoryPage', { 
        layout: 'layout', 
        title: title, 
        products: products, 
        isCategoryPage: res.locals.isCategoryPage, 
        isSubcategoryPage: res.locals.isSubcategoryPage, 
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