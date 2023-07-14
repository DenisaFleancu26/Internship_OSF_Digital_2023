var express = require('express');
var router = express.Router();

/* GET category page */
router.get('/:category', async function(req, res, next) {
  
    const CategoryModel = require('../models/category');
    const category = await CategoryModel.findOne({id: req.params.category});
  
    if(!category ){
  
      next({ status: 404, message: 'Oops, This Page Not Found!' });
  
    }else{
  
      res.locals.isCategoryPage = req.params.category;
  
      res.render('contentMainPage', { 
        layout: 'layout', 
        title: category.name, 
        category: category, 
        isCategoryPage: res.locals.isCategoryPage
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