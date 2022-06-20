(function(){{
    if (!isArray(index))
        throw new TypeError('Array expected');
    if (index.length <        $that._size.length)
        throw new DimensionError(index.length,         $that._size.length, '<');
    var i, ii, index_i;
    // enlarge matrix when needed
    var size = index.map(function (i) {
        return i + 1;
    });
    _fit(    $that, size, defaultValue);
    // traverse over the dimensions
    var data =     $that._data;
    for (i = 0, ii = index.length - 1; i < ii; i++) {
        index_i = index[i];
        validateIndex(index_i, data.length);
        data = data[index_i];
    }
    // set new value
    index_i = index[index.length - 1];
    validateIndex(index_i, data.length);
    data[index_i] = value;
    return    $that;
}})();