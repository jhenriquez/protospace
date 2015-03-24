var chai = require('chai'),
   proto = require('../');

describe('Bundling (Merging)', function () {
  before(function () {
    chai.should();
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
});