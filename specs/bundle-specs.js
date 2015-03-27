var chai = require('chai'),
   proto = require('../');

describe('Bundling (Merging)', function () {
  before(function () {
    chai.should();
  });

  beforeEach(function () {
    proto.clearGlobalRegistry();
  });

  it('should return an empty object if no registrations have been made', function () {
    proto.bundle().should.eql({});
  });

  it('with only one registed object', function () {
    var ns = proto.register(function func() {}, 'Some.Namespace');
    proto.bundle().should.eql(ns);
  });

  it('with multiple objects registered', function () {
    var fn = function fnOne() { };
    proto.register(fn, 'Functions');
    proto.register(fn, 'Functions', 'fnTwo');
    proto.bundle().Functions.should.exist.and.eql({
      fnOne: fn,
      fnTwo: fn
    });
  });

  it('should allow to bundle only a particular namespace', function () {
    var fn = function fnOne() { };
    proto.register(fn, 'Particular.Namespace');
    proto.register(fn, 'Particular.Namespace', 'fnTwo');
    proto.bundle('Particular.Namespace').should.eql({
      fnOne: fn,
      fnTwo: fn
    });
  });

  describe('Bundling from namedRegistries', function () {
    beforeEach(function () {
      proto.clearNamedRegistry();
      proto.clearGlobalRegistry();
    });

    it('should return an empty object when bundling from a non existent registry', function () {
      proto.bundleFrom('NonExistent').should.eql({});
    });

    it('should not bundle only the objects registered on the named registry', function () {
      function fn() { /* I'm just a humble named function */ };
      proto.register(fn, 'Global', 'namedFunction');
      proto.registerNamed('Named', fn, 'Named', 'namedFunction').should.eql({Named: { namedFunction: fn }});
      proto.bundleFrom('Named').should.eql({Named: { namedFunction: fn }});
      proto.bundle().should.eql({Global: { namedFunction: fn }});
    });
  });
});