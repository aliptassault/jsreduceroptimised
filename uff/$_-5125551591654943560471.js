(function(){{
    var i, ii;
    if (dim < dims) {
        var next = dim + 1;
        for (i = 0, ii = array.length; i < ii; i++) {
            array[i] = _squeeze(array[i], dims, next);
        }
    } else {
        while (Array.isArray(array)) {
            array = array[0];
        }
    }
    return array;
}})();