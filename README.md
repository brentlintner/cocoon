# [Cocoon](https://npmjs.org/package/cocoon)

![](https://david-dm.org/brentlintner/cocoon.png)

A small utility module for wrapping property getters within functions.

It is useful as a TDD helper for creating mockable/spyable methods on top of another
library's methods that are returned via a getter.

Note: This is not a cure-all. Objects could be frozen, etc.

## Example

```javascript
    var lib = {}
    function foo() {}
    lib.__defineGetter__('foo', function () { return foo })
```

With something like `sinon`, you can't (at the moment) mock setters.

With `cocoon`, you can:

```javascript
    var cocoon = require('cocoon')

    var c = cocoon
                .spin(lib)
                .wrap('foo')

    ..

    sinon.stub(lib, 'foo') // works

    c.restore()
```

Yay.

However.. if:

```javascript
    var self = {}

    function foo() {}
    self.__defineGetter__('foo', function () { return foo })
    Object.freeze(self)
    module.exports = self
```

..Nope. Not going to happen.
