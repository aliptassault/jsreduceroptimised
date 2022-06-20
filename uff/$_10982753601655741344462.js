(function(){{
    var i, ii;
    if (Array.isArray(array)) {
        var next = dim + 1;
        for (i = 0, ii = array.length; i < ii; i++) {
            array[i] = _unsqueeze(array[i], dims, next);
        }
    } else {
        for (var d = dim; d < dims; d++) {
            array = [array];
        }
    }
    return array;
}})();