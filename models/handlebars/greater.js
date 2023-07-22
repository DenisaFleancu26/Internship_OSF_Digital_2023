const hbs = require('hbs');

hbs.handlebars.registerHelper('greater', function(a, b) {
  return a > b;
});