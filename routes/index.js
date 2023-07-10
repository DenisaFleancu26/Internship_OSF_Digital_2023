var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('contentMainPage', { layout: 'layout', categories: null});
});

/* GET category page */
router.get('/:category', async function(req, res, next) {
  
  const retrieveDocument = async () => {
    var mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/shop');
    const CategoryModel = require('../models/category');
    return await CategoryModel.findOne({id: req.params.category});
  }
  const category = await retrieveDocument();

  res.locals.isCategoryPage = req.params.category;

  res.render('contentMainPage', { layout: 'layout', category: category, isCategoryPage: res.locals.isCategoryPage});
});

/* GET subcategory page */
router.get('/:category/:subcategory', async function(req, res, next){

  const fetchProducts = async () => {
    var mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/shop');
    const ProductModel = require('../models/product');
    return await ProductModel.find({primary_category_id: req.params.subcategory});
  }
  const products = await fetchProducts();

  res.locals.isSubcategoryPage = req.params.subcategory;
  res.locals.isCategoryPage = req.params.category;

  res.render('contentSubcategoryPage', { layout: 'layout', products: products, isCategoryPage: res.locals.isCategoryPage, isSubcategoryPage: res.locals.isSubcategoryPage});

});

module.exports = router;
