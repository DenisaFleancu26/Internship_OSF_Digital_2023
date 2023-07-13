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

    const CategoryModel = require('../models/category');
      const category = await CategoryModel.findOne({id: req.params.category});

      category.categories.forEach(element => {
        element.categories.forEach(el => {
            if(el.id === req.params.subcategory){
                title = el.page_title;
            }
        })
      });


    res.render('contentProductDetailPage', { layout: 'layout', title: product.name, product: product, isCategoryPage: res.locals.isCategoryPage, isSubcategoryPage: res.locals.isSubcategoryPage, isProductPage: product.id, longDescription: longDescription, subcategoryName: title});
  }

});

module.exports = router;