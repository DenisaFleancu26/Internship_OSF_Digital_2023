const express = require('express');
const router = express.Router();

router.get('/registration', (req, res) => {
  res.render('registrationPage', { 
    layout: 'layout', 
    title: "Registration", 
    categories: null,
    isRegistrationPage: true
  });
});


module.exports = router;