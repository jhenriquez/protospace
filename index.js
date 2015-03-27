var registry = require('./lib/registry'),
     bundler = require('./lib/bundler');

module.exports = {
  register: registry.register,
  registerNamed: registry.registerNamed,
  getGlobalRegistry: registry.getGlobalRegistry,
  clearGlobalRegistry: registry.clearGlobalRegistry,
  clearNamedRegistry: registry.clearNamedRegistry,
  getNamedRegistry: registry.getNamedRegistry,
  bundle: bundler.bundle,
  bundleFrom: bundler.bundleFrom
};