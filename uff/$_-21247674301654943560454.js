(function(){{
    if (array && typeof array.map === 'function') {
        // TODO: replace array.map with a for loop to improve performance
        return array.map(function (x) {
            return deepMap(x, callback, skipZeros);
        });
    } else {
        return callback(array);
    }
}})();