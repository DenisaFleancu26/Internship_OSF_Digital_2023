const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const categoryRouter = require('./routes/category');
const subcategoryRouter = require('./routes/subcategory');
const productRouter = require('./routes/product');
const GetValue = require('./routes/soap_methods/getvalue');
const GetLatestValue = require('./routes/soap_methods/getlatestvalue');
const GetValueAdv = require('./routes/soap_methods/getvalueadv');
const LastDateInserted = require('./routes/soap_methods/lastdateinserted');
const getCurrency = require('./routes/currency');
const registerRoute = require('./routes/registration');
require('./models/handlebars/equal');
require('./models/handlebars/greater');
require('./models/handlebars/and');
require('./models/handlebars/less');
require('./models/handlebars/notequal');
require('./models/handlebars/substract');
require('./models/handlebars/add');

const app = express();
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/getvalue', GetValue);
app.use('/getlatestvalue', GetLatestValue);
app.use('/getvalueadv', GetValueAdv);
app.use('/lastdateinserted', LastDateInserted);

app.use('/', getCurrency);
app.use('/', registerRoute);
app.use('/', indexRouter);
app.use('/', categoryRouter);
app.use('/', subcategoryRouter);
app.use('/', productRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
