const hbs = require('hbs');

hbs.handlebars.registerHelper('equal', function(a, b) {
  return a === b;
});
