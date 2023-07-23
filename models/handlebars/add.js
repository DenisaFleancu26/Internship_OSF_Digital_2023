const hbs = require('hbs');

hbs.handlebars.registerHelper('add', function(a, b) {
  return a + b;
});