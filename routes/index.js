var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('contentMainPage', { layout: 'layout', categories: null});
});

/* GET category page */
router.get('/:category', async function(req, res, next) {
  
  const CategoryModel = require('../models/category');
  const category = await CategoryModel.findOne({id: req.params.category});

  if(!category ){

    next({ status: 404, message: 'Category not found!' });

  }else{

    res.locals.isCategoryPage = req.params.category;

    res.render('contentMainPage', { layout: 'layout', category: category, isCategoryPage: res.locals.isCategoryPage});
  }
});

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
  // Verifică dacă eroarea are codul de stare 404
  if (err.status === 404) {
    res.status(404).render('error', { layout: 'layout',  message: err.message, status: err.status });
  } else {
    // Altfel, afișează eroarea internă
    res.status(500).render('error', { layout: 'layout', message: 'Internal Server Error', error: 500 });
  }
});

module.exports = router;
