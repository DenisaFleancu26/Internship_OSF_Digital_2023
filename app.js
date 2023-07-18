var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category');
var subcategoryRouter = require('./routes/subcategory');
var productRouter = require('./routes/product');
var GetValue = require('./soap/getvalue');
var GetLatestValue = require('./soap/getlatestvalue');
var GetValueAdv = require('./soap/getvalueadv');
var LastDateInserted = require('./soap/getvalueadv');
const { GetValueAdvCurrency } = require('./soap/getvalueadv');

var app = express();
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/getvalue', async (req, res) => {
  try {
    const date = '2023-07-16T12:34:56'; 
    const currency = 'USD'; 

    const value = await GetValue.GetValueCurrency(date, currency);
    res.send(`The value for ${currency} on ${date} is: ${value}`);

  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

app.get('/getlatestvalue/:currency', async (req, res) => {
  try {
    const currency = req.params.currency; 

    const value = await GetLatestValue.GetLatestValueCurrency(currency);
    res.send(`The value for ${currency} is: ${value}`);

  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

app.get('/getvalueadv', async (req, res) => {
  try {
    const date = '2023-07-16T12:34:56';
    const currency = 'USD';

    const { value, data, moneda } = await GetValueAdv.GetValueAdvCurrency(date, currency);
    res.send(`The value for ${moneda} on ${data} is: ${value}`);
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

app.get('/lastdateinserted', async (req, res) => {
  try {
    const date = await LastDateInserted.LastDateInsertedCurrency();
    res.send(`Last date insered: ${date}`);
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

app.get('/', async (req, res, next) => {
  if(req.query.currency){
    try {
      const currency = req.query.currency;
      const date = new Date();
      const price = await GetValueAdvCurrency(date.toISOString(), currency);

      res.json({"value": price.value})
    } catch(error){
      console.error(error);
      res.status(500).json({ error: "An error occurred"});
    }
  }else{
    next();
  }
});


//    http://localhost:3000/
app.use('/', indexRouter);
//    http://localhost:3000/:category
app.use('/', categoryRouter);
//    http://localhost:3000/:category/:subcategory
app.use('/', subcategoryRouter);
//    http://localhost:3000/:category/:subcategory/:product
app.use('/', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
