(function(){{
    // figure out what number of arguments the callback function expects
    var argsCount = maxArgumentCount(callback);
    function recurse(value, index) {
        if (Array.isArray(value)) {
            return map(value, function (child, i) {
                // we create a copy of the index array and append the new index value
                return recurse(child, index.concat(i + 1));    // one based index, hence i + 1
            });
        } else {
            // invoke the (typed) callback function with the right number of arguments
            if (argsCount === 1) {
                return callback(value);
            } else if (argsCount === 2) {
                return callback(value, index);
            } else {
                // 3 or -1
                return callback(value, index, orig);
            }
        }
    }
    return recurse(array, []);
}})();