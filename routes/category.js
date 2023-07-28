const express = require('express');
const router = express.Router();
const {findCategory} = require('../models/mongo/findCategory');
const authenticateToken = require('../models/mongo/authenticateToken');

router.get('/:category', authenticateToken, async function(req, res) {

  try{
    
      const category = await findCategory(req.params.category);
      
      res.locals.isCategoryPage = req.params.category;

      let user = null;
    if (req.user) {
      user = req.user.email;
    }

    res.render('contentMainPage' , {
      layout: 'layout',
      title: category.name,
      category: category,
      isCategoryPage: res.locals.isCategoryPage,
      user: user,
    });

  }catch(error){
      
  }    
});

module.exports = router;