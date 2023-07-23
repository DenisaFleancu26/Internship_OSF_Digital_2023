const hbs = require('hbs');

hbs.handlebars.registerHelper('less', function(a, b) {
  return a < b;
});