(function(){{
    // result arrays
    var values = [];
    var index = [];
    var ptr = [];
    // equal signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;
    if (isString(matrix._datatype)) {
        // find signature that matches (datatype, datatype)
        eq = typed.find(equalScalar, [
            matrix._datatype,
            matrix._datatype
        ]) || equalScalar;
        // convert 0 to the same datatype
        zero = typed.convert(0, matrix._datatype);
    }
    // invoke callback
    var invoke = function (v, x, y) {
        // invoke callback
        v = callback(v, x, y);
        // check value != 0
        if (!eq(v, zero)) {
            // store value
            values.push(v);
            // index
            index.push(x);
        }
    };
    // loop columns
    for (var j = minColumn; j <= maxColumn; j++) {
        // store pointer to values index
        ptr.push(values.length);
        // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
        var k0 = matrix._ptr[j];
        var k1 = matrix._ptr[j + 1];
        // row pointer
        var p = minRow;
        // loop k within [k0, k1[
        for (var k = k0; k < k1; k++) {
            // row index
            var i = matrix._index[k];
            // check i is in range
            if (i >= minRow && i <= maxRow) {
                // zero values
                if (!skipZeros) {
                    for (var x = p; x < i; x++)
                        invoke(0, x - minRow, j - minColumn);
                }
                // value @ k
                invoke(matrix._values[k], i - minRow, j - minColumn);
            }
            // update pointer
            p = i + 1;
        }
        // zero values
        if (!skipZeros) {
            for (var y = p; y <= maxRow; y++)
                invoke(0, y - minRow, j - minColumn);
        }
    }
    // store number of values in ptr
    ptr.push(values.length);
    // return sparse matrix
    return new SparseMatrix({
        values: values,
        index: index,
        ptr: ptr,
        size: [
            maxRow - minRow + 1,
            maxColumn - minColumn + 1
        ]
    });
}})();