(function(){{
    try {
        if (Array.isArray(object)) {
            return matrix(object).subset(index, value).valueOf();
        } else if (object && typeof object.subset === 'function') {
            // Matrix
            return object.subset(index, value);
        } else if (typeof object === 'string') {
            // TODO: move setStringSubset into a separate util file, use that
            return subset(object, index, value);
        } else if (typeof object === 'object') {
            if (!index.isObjectProperty()) {
                throw TypeError('Cannot apply a numeric index as object property');
            }
            setSafeProperty(object, index.getObjectProperty(), value);
            return object;
        } else {
            throw new TypeError('Cannot apply index: unsupported type of object');
        }
    } catch (err) {
        throw errorTransform(err);
    }
}})();