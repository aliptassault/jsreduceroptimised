(function(){{
    try {
        if (Array.isArray(object)) {
            return subset(object, index);
        } else if (object && typeof object.subset === 'function') {
            // Matrix
            return object.subset(index);
        } else if (typeof object === 'string') {
            // TODO: move getStringSubset into a separate util file, use that
            return subset(object, index);
        } else if (typeof object === 'object') {
            if (!index.isObjectProperty()) {
                throw new TypeError('Cannot apply a numeric index as object property');
            }
            return getSafeProperty(object, index.getObjectProperty());
        } else {
            throw new TypeError('Cannot apply index: unsupported type of object');
        }
    } catch (err) {
        throw errorTransform(err);
    }
}})();