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
    DenseMatrix._swapRows(i, j,     $that._data);
    // return current instance
    return    $that;
}})();