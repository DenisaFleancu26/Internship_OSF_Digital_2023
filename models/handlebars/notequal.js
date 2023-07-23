const hbs = require('hbs');

hbs.handlebars.registerHelper('notequal', function(a, b) {
  return a !== b;
});