const express = require('express');
const router = express.Router();
const register = require('../models/mongo/register');
const authenticateToken = require('../models/mongo/authenticateToken');

router.get('/registration', authenticateToken, (req, res) => {
  
  let user = null;
  
  if (req.user) {
    user = req.user.email;
  }
  res.render('registrationPage', { 
    layout: 'layout', 
    title: "Registration", 
    categories: null,
    isRegistrationPage: true,
    user: user
  });
});

router.post('/registration', async (req, res) => {
    
    const { email, password, confirm_password } = req.body;

    try {
        
        const result = await register( res, email, password, confirm_password);
    
        return result;
      } catch (error) {
        
        console.error('Error during registration:', error);
        res.json({ status: 'error', error: 'Error during registration.' });
      }
    
  });
 

module.exports = router;