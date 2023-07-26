const bcrypt = require('bcryptjs');
const User = require('../user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT;

async function register( res, email, password, confirm_password){

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
        console.log('User created successfully', user);
        return res.json({ status: 'ok', user: user, token: token});
    }catch(error){
        if(error.code === 11000){
            return res.json({ status: 'error', error:'Email already in use!'})
        }
        throw error
    }

}

module.exports = register;