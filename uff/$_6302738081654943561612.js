(function(){{
    if (!isArray(index))
        throw new TypeError('Array expected');
    if (index.length !=        $that._size.length)
        throw new DimensionError(index.length,         $that._size.length);
    // check it is a pattern matrix
    if (!        $that._values)
        throw new Error('Cannot invoke get on a Pattern only matrix');
    // row and column
    var i = index[0];
    var j = index[1];
    // check i, j are valid
    validateIndex(i,     $that._size[0]);
    validateIndex(j,     $that._size[1]);
    // find value index
    var k = _getValueIndex(i,     $that._ptr[j],     $that._ptr[j + 1],     $that._index);
    // check k is prior to next column k and it is in the correct row
    if (k <        $that._ptr[j + 1] &&        $that._index[k] === i)
        return        $that._values[k];
    return 0;
}})();