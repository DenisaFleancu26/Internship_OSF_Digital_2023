const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.get('/registration', (req, res) => {
  res.render('registrationPage', { 
    layout: 'layout', 
    title: "Registration", 
    categories: null,
    isRegistrationPage: true
  });
});

router.post('/registration', async (req, res) => {
    
    const { email, password, confirm_password } = req.body;

    if(password !== confirm_password){
        return res.json({ status: 'error', error: 'Passwords do not match!'});
    }
    if(!email){
        return res.json({ status: 'error', error: 'Invalid Email!'});
    }
    if(!password){
        return res.json({ status: 'error', error: 'Invalid Password'});
    }
    if(password.length < 6){
        return res.json({status:"error", error:'The Password must be at least 6 characters'});
    }
    
    const userPassword = await bcrypt.hash(password, 10);

        try{
            const user = await User.create({
                email: email,
                password: userPassword,
            });
            console.log('User created successfully', user);
            res.json({ status: 'ok'});
        }catch(error){
            if(error.code === 11000){
                return res.json({ status: 'error', error:'Email already in use!'})
            }
            throw error
        }
    
  });
 

module.exports = router;