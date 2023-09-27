require('source-map-support');
require('ts-node').register({
  files: true,
});

exports.createPages = require('./lib/createPages').createPages;
