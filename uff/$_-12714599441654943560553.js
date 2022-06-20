(function(){{
    // a sparse
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var adt = a._datatype;
    // validate a matrix
    if (!avalues)
        throw new Error('Cannot multiply Pattern only Matrix times Dense Matrix');
    // b dense
    var bdata = b._data;
    var bdt = b._datatype;
    // rows & columns
    var arows = a._size[0];
    var brows = b._size[0];
    // result
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    // datatype
    var dt;
    // addScalar signature to use
    var af = addScalar;
    // multiplyScalar signature to use
    var mf = multiplyScalar;
    // equalScalar signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;
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
        eq = typed.find(equalScalar, [
            dt,
            dt
        ]);
        // convert 0 to the same datatype
        zero = typed.convert(0, dt);
    }
    // workspace
    var x = [];
    // vector with marks indicating a value x[i] exists in a given column
    var w = [];
    // update ptr
    cptr[0] = 0;
    // rows in b
    for (var ib = 0; ib < brows; ib++) {
        // b[ib]
        var vbi = bdata[ib];
        // check b[ib] != 0, avoid loops
        if (!eq(vbi, zero)) {
            // A values & index in ib column
            for (var ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
                // a row
                var ia = aindex[ka];
                // check value exists in current j
                if (!w[ia]) {
                    // ia is new entry in j
                    w[ia] = true;
                    // add i to pattern of C
                    cindex.push(ia);
                    // x(ia) = A
                    x[ia] = mf(vbi, avalues[ka]);
                } else {
                    // i exists in C already
                    x[ia] = af(x[ia], mf(vbi, avalues[ka]));
                }
            }
        }
    }
    // copy values from x to column jb of c
    for (var p1 = cindex.length, p = 0; p < p1; p++) {
        // row
        var ic = cindex[p];
        // copy value
        cvalues[p] = x[ic];
    }
    // update ptr
    cptr[1] = cindex.length;
    // return sparse matrix
    return new SparseMatrix({
        values: cvalues,
        index: cindex,
        ptr: cptr,
        size: [
            arows,
            1
        ],
        datatype: dt
    });
}})();