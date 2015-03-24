(function () {
  var registry = [];

  function register(val, ns, nameOverride) {
    var namespaced = {};

    if ((typeof(val) === 'object'
        && !nameOverride) || 
        (typeof(val) === 'function'
        && !!!val.name)) {
      throw new Error('nameOverride can not be null when value is an object or an anonymous function.');
    }

    var exportProperty = nameOverride || val.name;
    
    var spaces = ns.split('.');

    spaces.reduce(function (reduce, value, index) {
      reduce[value] = reduce[value] || {};

      if (spaces.length - index === 1) {
        reduce[value][exportProperty] = val;
      }

      return reduce[value];

    }, namespaced);

    registry.push(namespaced);

    return namespaced;
  }

  function getObjects() {
    return registry.slice();
  }

  module.exports = {
    register: register,
    getObjects: getObjects
  };

})();