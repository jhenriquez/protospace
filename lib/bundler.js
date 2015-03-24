var _        = require('lodash');
var registry = require('./registry');

(function () {

  function bundle(ns) {
    var objs = registry.getObjects();
    
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

  module.exports = bundle;
})();