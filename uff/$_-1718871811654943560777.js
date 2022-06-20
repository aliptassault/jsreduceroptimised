(function(){{
    // validate k if any
    if (k) {
        // convert BigNumber to a number
        if (type.isBigNumber(k))
            k = k.toNumber();
        // is must be an integer
        if (!isNumber(k) || !isInteger(k)) {
            throw new TypeError('The parameter k must be an integer number');
        }
    } else {
        // default value
        k = 0;
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;
    // rows & columns
    var rows =     $that._size[0];
    var columns =     $that._size[1];
    // number diagonal values
    var n = Math.min(rows - kSub, columns - kSuper);
    // x is a matrix get diagonal from matrix
    var data = [];
    // loop rows
    for (var i = 0; i < n; i++) {
        data[i] =         $that._data[i + kSub][i + kSuper];
    }
    // create DenseMatrix
    return new DenseMatrix({
        data: data,
        size: [n],
        datatype:         $that._datatype
    });
}})();