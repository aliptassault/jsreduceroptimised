(function(){{
    if (index.size().length !== 1) {
        throw new DimensionError(index.size(), 1);
    }
    var key = index.dimension(0);
    if (typeof key !== 'string') {
        throw new TypeError('String expected as index to retrieve an object property');
    }
    return getSafeProperty(object, key);
}})();