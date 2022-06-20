(function(){{
    var accumulator = [];
    var i;
    if (sizes.length === 0) {
        if (array.length === 0) {
            throw new DimensionError(null, null, '!=');
        }
        return array.shift();
    }
    for (i = 0; i < sizes[0]; i += 1) {
        accumulator.push(_reshape(array, sizes.slice(1)));
    }
    return accumulator;
}})();