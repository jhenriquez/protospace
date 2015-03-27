var _        = require('lodash');
var registry = require('./registry');

(function () {

  function _bundle(objs, ns) {
    var selected;
    objs.unshift({});
    
    var bundled = _.merge.apply(_, objs), selected;

    if (ns) {
      var spaces = ns.split('.');
      var space;
      while(space = spaces.shift()) {
        selected = selected ? selected[space] : bundled[space];
      }
    }

    return selected || bundled;
  }

  function bundle(ns) {
    return _bundle(registry.getGlobalRegistry(), ns);
  }

  function bundleFrom(registryName, ns) {
    return _bundle(registry.getNamedRegistry(registryName), ns);
  }

  module.exports.bundle = bundle;
  module.exports.bundleFrom = bundleFrom;
})();