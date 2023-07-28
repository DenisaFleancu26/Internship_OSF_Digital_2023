
const User = require('../user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT;


async function signIn(res, email, password){

    try{
        const user = await User.findOne({ email }).lean();
    
        if(!user){
          return res.json({status: 'error-email', error: 'Invalid Email!'});
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
          return res.json({ status: 'ok', user: user, token: token});
        }else{
          return res.json({status: 'error-password', error: 'Invalid Password!'});
        }
      }catch(error){
        return res.json({ status: 'error', error: error.message});
      }
}

module.exports = signIn;