var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { layout: 'layout', categories: null});
});

router.get('/:categories', async function(req, res, next) {
  
  const retrieveDocument = async () => {
    var mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/shop');
    const CategoryModel = require('../models/category');
    return await CategoryModel.findOne({id: req.params.categories});
  }
  const category = await retrieveDocument();
  console.log(category);

  switch(req.params.categories){
    case 'mens':   
        res.locals.isMensPage = true;
        res.locals.isWomensPage = false;
        break;
    case 'womens':
        res.locals.isMensPage = false;
        res.locals.isWomensPage = true;
        break;
  }

  res.render('index', { layout: 'layout', category: category , isMensPage: res.locals.isMensPage, isWomensPage: res.locals.isWomensPage});
});

module.exports = router;
