const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT;

router.get('/', (req, res) => {
  res.render('contentMainPage', { 
    layout: 'layout', 
    title: "Home", 
    categories: null
  });
});

router.post('/', async (req, res) => {

  const { email, password } = req.body;

  try{
    const user = await User.findOne({ email }).lean();

    if(!user){
      return res.json({status: 'error', error: 'Invalid Email or Password!'});
    }

    if(await bcrypt.compare(password, user.password)){

      const token = jwt.sign(
        { 
          id: user._id, 
          email: user.email
        },
        JWT_SECRET,
        {
          expiresIn: '1d',
        }
      );
      return res.json({ status: 'ok', data: token});
    }else{
      return res.json({status: 'error', error: 'Invalid Email or Password!'});
    }
  }catch(error){
    return res.json({ status: 'error', error: error.message});
  }
  
})

module.exports = router;
