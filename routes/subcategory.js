let express = require('express');
let router = express.Router();

let title = '';

router.get('/:category/:subcategory', async function(req, res, next){

    const ProductModel = require('../models/product');
    const products = await ProductModel.find({primary_category_id: req.params.subcategory});
    
    if(!products || products.length === 0){
  
      next({ status: 404, message: 'Oops, This Page Not Found!' });
  
    }else{
  
      res.locals.isSubcategoryPage = req.params.subcategory;
      res.locals.isCategoryPage = req.params.category;

      const CategoryModel = require('../models/category');
      const category = await CategoryModel.findOne({id: req.params.category});

      category.categories.forEach(element => {
        element.categories.forEach(el => {
            if(el.id === req.params.subcategory){
                title = el.page_title;
            }
        })
      });
  
      res.render('contentSubcategoryPage', { 
        layout: 'layout', 
        title: title, 
        products: products, 
        isCategoryPage: res.locals.isCategoryPage, 
        isSubcategoryPage: res.locals.isSubcategoryPage, 
        subcategoryName: title
      });
  
    }
  });
  

  router.use(function(err, req, res, next) {
    if (err.status === 404) {
      res.status(404).render('error', { 
        layout: 'layout',  
        message: err.message, 
        status: err.status 
      });
    } else {
      res.status(500).render('error', { 
        layout: 'layout', 
        message: 'Internal Server Error', 
        error: 500 
      });
    }
  });


  module.exports = router;