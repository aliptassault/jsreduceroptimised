(function(){{
    if (typeof memoize.cache !== 'object') {
        memoize.cache = {};
    }
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
    }
    var hash = hasher ? hasher(args) : JSON.stringify(args);
    if (!(hash in memoize.cache)) {
        return memoize.cache[hash] = fn.apply(fn, args);
    }
    return memoize.cache[hash];
}})();