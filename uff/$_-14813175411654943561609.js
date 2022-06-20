(function(){{
    // check idx
    if (!type.isIndex(idx)) {
        throw new TypeError('Invalid index');
    }
    var isScalar = idx.isScalar();
    if (isScalar) {
        // return a scalar
        return matrix.get(idx.min());
    }
    // validate dimensions
    var size = idx.size();
    if (size.length != matrix._size.length) {
        throw new DimensionError(size.length, matrix._size.length);
    }
    // vars
    var i, ii, k, kk;
    // validate if any of the ranges in the index is out of range
    var min = idx.min();
    var max = idx.max();
    for (i = 0, ii = matrix._size.length; i < ii; i++) {
        validateIndex(min[i], matrix._size[i]);
        validateIndex(max[i], matrix._size[i]);
    }
    // matrix arrays
    var mvalues = matrix._values;
    var mindex = matrix._index;
    var mptr = matrix._ptr;
    // rows & columns dimensions for result matrix
    var rows = idx.dimension(0);
    var columns = idx.dimension(1);
    // workspace & permutation vector
    var w = [];
    var pv = [];
    // loop rows in resulting matrix
    rows.forEach(function (i, r) {
        // update permutation vector
        pv[i] = r[0];
        // mark i in workspace
        w[i] = true;
    });
    // result matrix arrays
    var values = mvalues ? [] : undefined;
    var index = [];
    var ptr = [];
    // loop columns in result matrix
    columns.forEach(function (j) {
        // update ptr
        ptr.push(index.length);
        // loop values in column j
        for (k = mptr[j], kk = mptr[j + 1]; k < kk; k++) {
            // row
            i = mindex[k];
            // check row is in result matrix
            if (w[i] === true) {
                // push index
                index.push(pv[i]);
                // check we need to process values
                if (values)
                    values.push(mvalues[k]);
            }
        }
    });
    // update ptr
    ptr.push(index.length);
    // return matrix
    return new SparseMatrix({
        values: values,
        index: index,
        ptr: ptr,
        size: size,
        datatype: matrix._datatype
    });
}})();