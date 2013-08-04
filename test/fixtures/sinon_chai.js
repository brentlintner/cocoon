var
  sinon = require('sinon'),
  chai = require('chai'),
  sinonChai = require('sinon-chai')

chai
  .use(sinonChai)
  .use(chai.should)
  .should()

function sandbox(callback) {
  var session

  beforeEach(function () {
    session = sinon.sandbox.create()
    callback(session)
  })

  afterEach(function () {
    session.verifyAndRestore()
  })
}

module.exports = sandbox
