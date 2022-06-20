(function(){{
    // figure out what number of arguments the callback function expects
    var args = maxArgumentCount(callback);
    return filter(x, function (value, index, array) {
        // invoke the callback function with the right number of arguments
        if (args === 1) {
            return callback(value);
        } else if (args === 2) {
            return callback(value, [index + 1]);
        } else {
            // 3 or -1
            return callback(value, [index + 1], array);
        }
    });
}})();