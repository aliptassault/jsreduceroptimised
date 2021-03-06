(function(){{
    // dense matrix arrays
    var adata = denseMatrix._data;
    var asize = denseMatrix._size;
    var adt = denseMatrix._datatype;
    // sparse matrix arrays
    var bvalues = sparseMatrix._values;
    var bindex = sparseMatrix._index;
    var bptr = sparseMatrix._ptr;
    var bsize = sparseMatrix._size;
    var bdt = sparseMatrix._datatype;
    // validate dimensions
    if (asize.length !== bsize.length)
        throw new DimensionError(asize.length, bsize.length);
    // check rows & columns
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1])
        throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
    // sparse matrix cannot be a Pattern matrix
    if (!bvalues)
        throw new Error('Cannot perform operation on Dense Matrix and Pattern Sparse Matrix');
    // rows & columns
    var rows = asize[0];
    var columns = asize[1];
    // datatype
    var dt;
    // equal signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;
    // callback signature to use
    var cf = callback;
    // process data types
    if (typeof adt === 'string' && adt === bdt) {
        // datatype
        dt = adt;
        // find signature that matches (dt, dt)
        eq = typed.find(equalScalar, [
            dt,
            dt
        ]);
        // convert 0 to the same datatype
        zero = typed.convert(0, dt);
        // callback
        cf = typed.find(callback, [
            dt,
            dt
        ]);
    }
    // result (SparseMatrix)
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    // loop columns in b
    for (var j = 0; j < columns; j++) {
        // update cptr
        cptr[j] = cindex.length;
        // values in column j
        for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
            // row
            var i = bindex[k];
            // update C(i,j)
            var cij = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]);
            // check for nonzero
            if (!eq(cij, zero)) {
                // push i & v
                cindex.push(i);
                cvalues.push(cij);
            }
        }
    }
    // update cptr
    cptr[columns] = cindex.length;
    // return sparse matrix
    return new SparseMatrix({
        values: cvalues,
        index: cindex,
        ptr: cptr,
        size: [
            rows,
            columns
        ],
        datatype: dt
    });
}})();