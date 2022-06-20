(function(){{
    if (!isArray(index))
        throw new TypeError('Array expected');
    if (index.length !=        $that._size.length)
        throw new DimensionError(index.length,         $that._size.length);
    // check it is a pattern matrix
    if (!        $that._values)
        throw new Error('Cannot invoke set on a Pattern only matrix');
    // row and column
    var i = index[0];
    var j = index[1];
    // rows & columns
    var rows =     $that._size[0];
    var columns =     $that._size[1];
    // equal signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;
    if (isString(        $that._datatype)) {
        // find signature that matches (datatype, datatype)
        eq = typed.find(equalScalar, [
                        $that._datatype,
                        $that._datatype
        ]) || equalScalar;
        // convert 0 to the same datatype
        zero = typed.convert(0,         $that._datatype);
    }
    // check we need to resize matrix
    if (i > rows - 1 || j > columns - 1) {
        // resize matrix
        _resize(        $that, Math.max(i + 1, rows), Math.max(j + 1, columns), defaultValue);
        // update rows & columns
        rows =         $that._size[0];
        columns =         $that._size[1];
    }
    // check i, j are valid
    validateIndex(i, rows);
    validateIndex(j, columns);
    // find value index
    var k = _getValueIndex(i,     $that._ptr[j],     $that._ptr[j + 1],     $that._index);
    // check k is prior to next column k and it is in the correct row
    if (k <        $that._ptr[j + 1] &&        $that._index[k] === i) {
        // check value != 0
        if (!eq(v, zero)) {
            // update value
                        $that._values[k] = v;
        } else {
            // remove value from matrix
            _remove(k, j,             $that._values,             $that._index,             $that._ptr);
        }
    } else {
        // insert value @ (i, j)
        _insert(k, i, j, v,         $that._values,         $that._index,         $that._ptr);
    }
    return    $that;
}})();