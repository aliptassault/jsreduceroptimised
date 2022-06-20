(function(){{
    // a dense
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype;
    // b dense
    var bdata = b._data;
    var bsize = b._size;
    var bdt = b._datatype;
    // rows & columns
    var alength = asize[0];
    var bcolumns = bsize[1];
    // datatype
    var dt;
    // addScalar signature to use
    var af = addScalar;
    // multiplyScalar signature to use
    var mf = multiplyScalar;
    // process data types
    if (adt && bdt && adt === bdt && typeof adt === 'string') {
        // datatype
        dt = adt;
        // find signatures that matches (dt, dt)
        af = typed.find(addScalar, [
            dt,
            dt
        ]);
        mf = typed.find(multiplyScalar, [
            dt,
            dt
        ]);
    }
    // result
    var c = [];
    // loop matrix columns
    for (var j = 0; j < bcolumns; j++) {
        // sum (do not initialize it with zero)
        var sum = mf(adata[0], bdata[0][j]);
        // loop vector
        for (var i = 1; i < alength; i++) {
            // multiply & accumulate
            sum = af(sum, mf(adata[i], bdata[i][j]));
        }
        c[j] = sum;
    }
    // return matrix
    return new DenseMatrix({
        data: c,
        size: [bcolumns],
        datatype: dt
    });
}})();