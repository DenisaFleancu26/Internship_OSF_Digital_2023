const express = require('express');
const router = express.Router();
const { findCategoryName } = require('../models/mongo/findCategory');
const { findSubcategoryProducts } = require('../models/mongo/findSubcategoryProducts');
let title = '';

router.get('/:category/:subcategory', async function(req, res, next){

    try{
      const { length, products} = await findSubcategoryProducts(req.params.subcategory, req.query.page || 1);
      title = await findCategoryName(req.params.category, req.params.subcategory);

      res.locals.isSubcategoryPage = req.params.subcategory;
      res.locals.isCategoryPage = req.params.category;
      const page = req.query.page || 1;

      const pageNumbers = Array.from({ length: Math.ceil(length / 6) }, (_, index) => index + 1);

      res.render('contentSubcategoryPage', { 
        layout: 'layout', 
        title: title, 
        products: products, 
        isCategoryPage: res.locals.isCategoryPage, 
        isSubcategoryPage: res.locals.isSubcategoryPage, 
        subcategoryName: title,
        current: Number(page),
        pages: pageNumbers
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