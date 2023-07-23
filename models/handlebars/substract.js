const hbs = require('hbs');

hbs.handlebars.registerHelper('substract', function(a, b) {
  return a - b;
});