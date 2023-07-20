const express = require('express');
const router = express.Router();
const {findCategory} = require('../models/mongo/findCategory');

router.get('/:category', async function(req, res) {

  try{
      const category = await findCategory(req.params.category);
      res.locals.isCategoryPage = req.params.category;

      res.render('contentMainPage', { 
        layout: 'layout', 
        title: category.name, 
        category: category, 
        isCategoryPage: res.locals.isCategoryPage
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