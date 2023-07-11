var express = require('express');
var router = express.Router();

/* GET subcategory page */
router.get('/:category/:subcategory', async function(req, res, next){

    const ProductModel = require('../models/product');
    const products = await ProductModel.find({primary_category_id: req.params.subcategory});
    
    if(!products || products.length === 0){
  
      next({ status: 404, message: 'Subcategory not found!' });
  
    }else{
  
      res.locals.isSubcategoryPage = req.params.subcategory;
      res.locals.isCategoryPage = req.params.category;
  
      res.render('contentSubcategoryPage', { layout: 'layout', products: products, isCategoryPage: res.locals.isCategoryPage, isSubcategoryPage: res.locals.isSubcategoryPage});
  
    }
  });
  
  router.use(function(err, req, res, next) {
    if (err.status === 404) {
      res.status(404).render('error', { layout: 'layout',  message: err.message, status: err.status });
    } else {
      res.status(500).render('error', { layout: 'layout', message: 'Internal Server Error', error: 500 });
    }
  });


  module.exports = router;