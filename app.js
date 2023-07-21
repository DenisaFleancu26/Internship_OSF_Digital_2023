let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let indexRouter = require('./routes/index');
let categoryRouter = require('./routes/category');
let subcategoryRouter = require('./routes/subcategory');
let productRouter = require('./routes/product');
let GetValue = require('./routes/soap_methods/getvalue');
let GetLatestValue = require('./routes/soap_methods/getlatestvalue');
let GetValueAdv = require('./routes/soap_methods/getvalueadv');
let LastDateInserted = require('./routes/soap_methods/lastdateinserted');
let getCurrency = require('./routes/currency');

let app = express();
let hbs = require('hbs');
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
