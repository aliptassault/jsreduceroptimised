(function(){{
    if (!isArray(index))
        throw new TypeError('Array expected');
    if (index.length !=        $that._size.length)
        throw new DimensionError(index.length,         $that._size.length);
    // check index
    for (var x = 0; x < index.length; x++)
        validateIndex(index[x],         $that._size[x]);
    var data =     $that._data;
    for (var i = 0, ii = index.length; i < ii; i++) {
        var index_i = index[i];
        validateIndex(index_i, data.length);
        data = data[index_i];
    }
    return data;
}})();