const express = require('express');
const router = express.Router();
const signIn = require('../models/mongo/sign_in');
const authenticateToken = require('../models/mongo/authenticateToken');

router.get('/',authenticateToken,  (req, res) => {

  let user = null;
  
  if (req.user) {
    user = req.user.email;
  }
    res.render('contentMainPage', { 
        layout: 'layout', 
        title: "Home", 
        categories: null,
        user: user
      });
  
});

router.post('/', async (req, res) => {

  const { email, password } = req.body;

  try {
        
    const result = await signIn( res, email, password);

    return result;
  } catch (error) {
    
    console.error('Error during sign in:', error);
    res.json({ status: 'error', error: 'Error during sign in.' });
  }
  
})

module.exports = router;
