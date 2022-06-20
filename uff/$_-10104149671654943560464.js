(function(){{
    var flatArray = exports.flatten(array);
    var newArray;
    var product = function (arr) {
        return arr.reduce(function (prev, curr) {
            return prev * curr;
        });
    };
    if (!Array.isArray(array) || !Array.isArray(sizes)) {
        throw new TypeError('Array expected');
    }
    if (sizes.length === 0) {
        throw new DimensionError(0, product(exports.size(array)), '!=');
    }
    try {
        newArray = _reshape(flatArray, sizes);
    } catch (e) {
        if (e instanceof DimensionError) {
            throw new DimensionError(product(sizes), product(exports.size(array)), '!=');
        }
        throw e;
    }
    if (flatArray.length > 0) {
        throw new DimensionError(product(sizes), product(exports.size(array)), '!=');
    }
    return newArray;
}})();