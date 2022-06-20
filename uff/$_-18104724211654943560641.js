(function(){{
    if (index.size().length !== 1) {
        throw new DimensionError(index.size(), 1);
    }
    var key = index.dimension(0);
    if (typeof key !== 'string') {
        throw new TypeError('String expected as index to retrieve an object property');
    }
    // clone the object, and apply the property to the clone
    var updated = clone(object);
    setSafeProperty(updated, key, replacement);
    return updated;
}})();