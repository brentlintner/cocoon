var
  npm_json = require('./../../package'),
  bower_json = require('./../../bower')

require('colors')

module.exports = function (md) {
  var modules = Object.keys(npm_json.dependencies)
                      .concat(Object.keys(npm_json.devDependencies))
                      .concat(Object.keys(bower_json.dependencies))
  if (!md) {
    console.log("  brought to you by:")
    console.log()
  }

  modules
    .sort()
    .forEach(function (name) {
      if (!md) console.log("  " + name.cyan)
      else console.log(name)
    })
}
