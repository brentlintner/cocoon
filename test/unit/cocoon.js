describe('cocoon', function () {
  var
    cocoon = require('./../../lib/cocoon'),
    expect = require('./../fixtures/expect')

  describe('main library', function () {
    it('is cocoon', function () {
      var lib = require('./../../lib')
      expect(lib).to.eql(cocoon)
    })
  })

  describe('object', function () {
    var
      spun,
      object,
      prop_value = function () {return 5},
      prop_two_value = function () {return 10}

    beforeEach(function () {
      object = {}

      // writable/configurable descriptors *need* be true
      Object.defineProperty(object, 'prop', {
        value: prop_value,
        writable: true,
        configurable: true
      })

      Object.defineProperty(object, 'prop_two', {
        value: prop_two_value,
        writable: true,
        configurable: true
      })

      spun = cocoon.spin(object)
    })

    describe('spin', function () {
      it('can override an object\'s getter with a function', function () {
        var orig_prop = object.prop

        expect(spun.wrap('prop')).to.eql(spun)
        expect(typeof object.prop).to.eql("function")
        expect(object.prop()).to.eql(orig_prop)
      })
    })

    describe('restore', function () {
      it('resets all properties', function () {
        var
          orig_prop = object.prop,
          orig_prop_two = object.prop_two

        spun
          .wrap('prop')
          .wrap('prop_two')

        expect(object.prop()).to.eql(orig_prop)
        expect(object.prop_two()).to.eql(orig_prop_two)

        spun.restore()

        expect(object.prop).to.eql(orig_prop)
        expect(object.prop_two).to.eql(orig_prop_two)
      })
    })
  })
})

