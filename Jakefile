// use this, vs requiring modules immediately upon eval of this file
// this means only the modules needed for a specific task will be evaluated
function use(module) {
  return function () {
    require('./tasks/' + module).apply(this, Array.prototype.slice.call(arguments))
  }
}

desc('jake test')
task('default', ['test'])

desc('checks for outdated npm packages via npm police')
task('police', use('police'), {async: true})

desc('runs jake lint:js')
task('lint', ['lint:js'])

namespace('lint', function () {
  desc('runs jshint')
  task('js', use('lint/js'), {async: true})
})

desc('runs all tests')
task('test', ['test:unit[dot]'])

namespace('test', function () {
  desc('runs "jake test" with code coverage')
  task('cov', use('test/coverage'))

  desc('runs all unit tests (in node)')
  task('unit', use('test/unit'), {async: true})
})

desc('displays stats:code')
task('stats', ['stats:code'])

namespace('stats', function () {
  desc('displays some code base stats')
  task('code', use('stats/js'))

  desc('this *should* display all third party modules used in the project')
  task('deps', use('stats/dependencies'))

  desc('shows an end of line semi-colons in code')
  task('sc', use('stats/semi_colons'), {async: true})
})
