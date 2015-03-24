var chai = require('chai');

describe('Clousure', function () {
  before(function () {
    chai.should();
  });

  it('should sustain values over multiple requires.', function () {
    var spaceOne = require('../');
    var spaceTwo = require('../');
    spaceOne.register(function pablo() { }, 'Some.Namespace');
    spaceTwo.register(function pablo() { }, 'Some.Namespace');
    spaceOne.getObjects().length.should.be.at.least(2);
    spaceTwo.getObjects().length.should.be.at.least(2);
  });

  it('should not contaminate the global space.', function () {
    chai.expect(global.objs).to.not.exist;
  });
});