(function(){{
    if (isMatrix(array)) {
        array = array.valueOf();
    }
    for (var i = 0, ii = array.length; i < ii; i++) {
        var value = array[i];
        if (Array.isArray(value)) {
            deepForEach(value, callback);
        } else {
            callback(value);
        }
    }
}})();