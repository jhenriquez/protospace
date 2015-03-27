var _ = require('lodash');

(function () {
  var registry = [];
  var namedRegistry = [];

  function _createNamespaceObject(val, ns, nameOverride) {
    var namespaced = {};

    if ((typeof(val) === 'object'
        && !nameOverride) || 
        (typeof(val) === 'function'
        && !!!val.name)) {
      throw new Error('nameOverride can not be null when value is an object or an anonymous function.');
    }

    var exportProperty = nameOverride || val.name;

    if (!ns) {
      namespaced[exportProperty] = val;
    } else {
      var spaces = ns.split('.');

      spaces.reduce(function (reduce, value, index) {
        reduce[value] = reduce[value] || {};

        if (spaces.length - index === 1) {
          reduce[value][exportProperty] = val;
        }

        return reduce[value];

      }, namespaced);
    }

    return namespaced;
  }

  function register(val, ns, nameOverride) {
    registry.push(_createNamespaceObject(val, ns, nameOverride));
    return _.last(registry);
  }

  function registerNamed(registry, val, ns, nameOverride) {
    namedRegistry[registry] = namedRegistry[registry] || [];
    namedRegistry[registry].push(_createNamespaceObject(val, ns, nameOverride));
    return _.last(namedRegistry[registry]);
  }

  function getGlobalRegistry() {
    return registry.slice();
  }

  function clearGlobalRegistry() {
    registry = [];
  }

  function getNamedRegistry(registry) {
    if (registry) {
      return namedRegistry[registry] || [];
    }
    return Object.keys(namedRegistry);
  }

  function clearNamedRegistry() {
    namedRegistry = {};
  }

  function removeNamedRegistry(registry) {
    delete namedRegistry[registry];
  }

  module.exports = {
    register: register,
    registerNamed: registerNamed,
    getGlobalRegistry: getGlobalRegistry,
    clearGlobalRegistry: clearGlobalRegistry,
    clearNamedRegistry: clearNamedRegistry,
    getNamedRegistry: getNamedRegistry
  };

})(); 