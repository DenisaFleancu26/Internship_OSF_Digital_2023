var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category');
var subcategoryRouter = require('./routes/subcategory');
var productRouter = require('./routes/product')

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

// connect to MongoDB
const url = 'mongodb+srv://denisafleancu2609:denisafleancu2609@cluster0.wv2ku4y.mongodb.net/shop?retryWrites=true&w=majority';
const connectionParams={
  useNewUrlParser: true
}

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to MongoDB ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

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
