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
const { GetValueAdvCurrency } = require('./models/soap/getvalueadv');

let app = express();
let hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
// view engine setup
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
