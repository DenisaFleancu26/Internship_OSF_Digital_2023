const hbs = require('hbs');

hbs.handlebars.registerHelper('and', function(a, b) {
  return a && b;
});