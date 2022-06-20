(function(){{
    // figure out what number of arguments the callback function expects
    var args = maxArgumentCount(callback);
    var recurse = function (value, index) {
        if (Array.isArray(value)) {
            forEach(value, function (child, i) {
                // we create a copy of the index array and append the new index value
                recurse(child, index.concat(i));
            });
        } else {
            // invoke the callback function with the right number of arguments
            if (args === 1) {
                callback(value);
            } else if (args === 2) {
                callback(value, index);
            } else {
                // 3 or -1
                callback(value, index, array);
            }
        }
    };
    recurse(array, []);
}})();