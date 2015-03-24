var registry = require('./lib/registry'),
     bundler = require('./lib/bundler');

module.exports = {
  register: registry.register,
  getObjects: registry.getObjects,
  bundle: bundler
};