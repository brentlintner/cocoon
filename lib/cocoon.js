function pre_wrap(cache, object, key) {
  cache[key] = object[key]
  delete object[key]
}

function post_wrap(cache, object, key) {
  delete object[key]
  object[key] = cache[key]
}

function wrap_property(api, cache, object, key) {
  pre_wrap(cache, object, key)
  object[key] = function () {
    return cache[key]
  }
  return api
}

function restore_all(api, cache, object) {
  Object.keys(cache)
    .forEach(post_wrap.bind(null, cache, object))
  cache = {}
  return api
}

function wrap_object(object) {
  var
    cache = {},
    api = {}

  api.wrap = wrap_property.bind(null, api, cache, object)
  api.restore = restore_all.bind(null, api, cache, object)

  return api
}

module.exports = {
  spin: wrap_object
}
