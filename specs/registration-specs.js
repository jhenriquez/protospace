var chai = require('chai'),
   proto;

describe('Objects and Functions Registration', function () {
  before(function () {
    chai.should();
  });

  beforeEach(function () {
    proto = require('../');
  });

  it('should expose a register method', function () {
    proto.register.should.exist.and.be.a('function');
  });

  it('should allow to associate a named function with a namespace', function () {
    var fn = function namedFunction() { };
    proto.register(fn, 'Functions').should.eql({ Functions: { namedFunction: fn } });
  });

  it('should allow the function export property to be overriden', function () {
    var fn = function namedFunction() { };
    proto.register(fn, 'Functions', 'newFunctionName').should.eql({ Functions: { newFunctionName: fn } });
  });

  it('should allow registration multiple levels deep', function () {
    var fn = function namedFunction() { };
    proto.register(fn, 'Three.Levels.Deep').should.eql({
      Three: {
        Levels: {
          Deep: {
            namedFunction: fn
          }
        }
      }
    });
  });

  it('should allow the registration of objects', function () {
    var someObject = { some: { value: 'yes!' } };
    proto.register(someObject, 'Some.Namespace', 'SomeObject').should.eql({
      Some: {
        Namespace: {
          SomeObject: someObject
        }
      }
    });
  });

  it('nameOverride can not be undefined when registering objects', function () {
    (function() { proto.register({}, 'Some.Namespace'); }).should.throw(Error);
  });
});