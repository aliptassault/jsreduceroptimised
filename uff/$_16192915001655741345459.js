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
    // diagonal arrays
    var values = [];
    var index = [];
    var ptr = [];
    // initial ptr value
    ptr[0] = 0;
    // loop columns
    for (var j = kSuper; j < columns && values.length < n; j++) {
        // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
        var k0 =         $that._ptr[j];
        var k1 =         $that._ptr[j + 1];
        // loop x within [k0, k1[
        for (var x = k0; x < k1; x++) {
            // row index
            var i =             $that._index[x];
            // check row
            if (i === j - kSuper + kSub) {
                // value on this column
                values.push(                $that._values[x]);
                // store row
                index[values.length - 1] = i - kSub;
                // exit loop
                break;
            }
        }
    }
    // close ptr
    ptr.push(values.length);
    // return matrix
    return new SparseMatrix({
        values: values,
        index: index,
        ptr: ptr,
        size: [
            n,
            1
        ]
    });
}})();