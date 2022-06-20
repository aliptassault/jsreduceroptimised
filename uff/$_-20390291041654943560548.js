(function(){{
    // a dense
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype;
    // b dense
    var bdata = b._data;
    var bdt = b._datatype;
    // rows & columns
    var arows = asize[0];
    var acolumns = asize[1];
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
    // loop matrix a rows
    for (var i = 0; i < arows; i++) {
        // current row
        var row = adata[i];
        // sum (do not initialize it with zero)
        var sum = mf(row[0], bdata[0]);
        // loop matrix a columns
        for (var j = 1; j < acolumns; j++) {
            // multiply & accumulate
            sum = af(sum, mf(row[j], bdata[j]));
        }
        c[i] = sum;
    }
    // return matrix
    return new DenseMatrix({
        data: c,
        size: [arows],
        datatype: dt
    });
}})();