(function(){{
    // figure out what number of arguments the callback function expects
    var args = maxArgumentCount(callback);
    var recurse = function (value, index) {
        if (Array.isArray(value)) {
            return value.map(function (child, i) {
                // we create a copy of the index array and append the new index value
                return recurse(child, index.concat(i));
            });
        } else {
            // invoke the callback function with the right number of arguments
            if (args === 1) {
                return callback(value);
            } else if (args === 2) {
                return callback(value, index);
            } else {
                // 3 or -1
                return callback(value, index, array);
            }
        }
    };
    return recurse(array, []);
}})();