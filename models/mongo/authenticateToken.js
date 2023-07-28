const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT;

async function authenticateToken(req, res, next) {
    const token = req.cookies.token ;
    req.user = null;
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (!err) {
        req.user = user; 
        
      }next();
    });
}

module.exports = authenticateToken;

