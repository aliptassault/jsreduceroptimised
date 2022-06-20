(function(){{
    // sparse matrix arrays
    var asize = a._size;
    var adt = a._datatype;
    // sparse matrix arrays
    var bsize = b._size;
    var bdt = b._datatype;
    // validate dimensions
    if (asize.length !== bsize.length)
        throw new DimensionError(asize.length, bsize.length);
    // check rows & columns
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1])
        throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
    // rows & columns
    var rows = asize[0];
    var columns = asize[1];
    // datatype
    var dt;
    // zero value
    var zero = 0;
    // callback signature to use
    var cf = callback;
    // process data types
    if (typeof adt === 'string' && adt === bdt) {
        // datatype
        dt = adt;
        // convert 0 to the same datatype
        zero = typed.convert(0, dt);
        // callback
        cf = typed.find(callback, [
            dt,
            dt
        ]);
    }
    // vars
    var i, j;
    // result arrays
    var cdata = [];
    // initialize c
    for (i = 0; i < rows; i++)
        cdata[i] = [];
    // matrix
    var c = new DenseMatrix({
        data: cdata,
        size: [
            rows,
            columns
        ],
        datatype: dt
    });
    // workspaces
    var xa = [];
    var xb = [];
    // marks indicating we have a value in x for a given column
    var wa = [];
    var wb = [];
    // loop columns
    for (j = 0; j < columns; j++) {
        // columns mark
        var mark = j + 1;
        // scatter the values of A(:,j) into workspace
        _scatter(a, j, wa, xa, mark);
        // scatter the values of B(:,j) into workspace
        _scatter(b, j, wb, xb, mark);
        // loop rows
        for (i = 0; i < rows; i++) {
            // matrix values @ i,j
            var va = wa[i] === mark ? xa[i] : zero;
            var vb = wb[i] === mark ? xb[i] : zero;
            // invoke callback
            cdata[i][j] = cf(va, vb);
        }
    }
    // return sparse matrix
    return c;
}})();