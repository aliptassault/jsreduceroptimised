(function(){{
    // a dense
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype;
    // b sparse
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bsize = b._size;
    var bdt = b._datatype;
    // validate b matrix
    if (!bvalues)
        throw new Error('Cannot multiply Dense Matrix times Pattern only Matrix');
    // rows & columns
    var arows = asize[0];
    var bcolumns = bsize[1];
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
    // result
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    // c matrix
    var c = new SparseMatrix({
        values: cvalues,
        index: cindex,
        ptr: cptr,
        size: [
            arows,
            bcolumns
        ],
        datatype: dt
    });
    // loop b columns
    for (var jb = 0; jb < bcolumns; jb++) {
        // update ptr
        cptr[jb] = cindex.length;
        // indeces in column jb
        var kb0 = bptr[jb];
        var kb1 = bptr[jb + 1];
        // do not process column jb if no data exists
        if (kb1 > kb0) {
            // last row mark processed
            var last = 0;
            // loop a rows
            for (var i = 0; i < arows; i++) {
                // column mark
                var mark = i + 1;
                // C[i, jb]
                var cij;
                // values in b column j
                for (var kb = kb0; kb < kb1; kb++) {
                    // row
                    var ib = bindex[kb];
                    // check value has been initialized
                    if (last !== mark) {
                        // first value in column jb
                        cij = mf(adata[i][ib], bvalues[kb]);
                        // update mark
                        last = mark;
                    } else {
                        // accumulate value
                        cij = af(cij, mf(adata[i][ib], bvalues[kb]));
                    }
                }
                // check column has been processed and value != 0
                if (last === mark && !eq(cij, zero)) {
                    // push row & value
                    cindex.push(i);
                    cvalues.push(cij);
                }
            }
        }
    }
    // update ptr
    cptr[bcolumns] = cindex.length;
    // return sparse matrix
    return c;
}})();