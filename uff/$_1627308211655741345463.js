(function(){{
    // check index
    if (!isNumber(i) || !isInteger(i) || !isNumber(j) || !isInteger(j)) {
        throw new Error('Row index must be positive integers');
    }
    // check dimensions
    if (        $that._size.length !== 2) {
        throw new Error('Only two dimensional matrix is supported');
    }
    // validate index
    validateIndex(i,     $that._size[0]);
    validateIndex(j,     $that._size[0]);
    // swap rows
    SparseMatrix._swapRows(i, j,     $that._size[1],     $that._values,     $that._index,     $that._ptr);
    // return current instance
    return    $that;
}})();