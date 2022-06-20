(function(){{
    // a sparse
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var adt = a._datatype;
    // b sparse
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bdt = b._datatype;
    // rows & columns
    var arows = a._size[0];
    var bcolumns = b._size[1];
    // flag indicating both matrices (a & b) contain data
    var values = avalues && bvalues;
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
    var cvalues = values ? [] : undefined;
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
    // workspace
    var x = values ? [] : undefined;
    // vector with marks indicating a value x[i] exists in a given column
    var w = [];
    // variables
    var ka, ka0, ka1, kb, kb0, kb1, ia, ib;
    // loop b columns
    for (var jb = 0; jb < bcolumns; jb++) {
        // update ptr
        cptr[jb] = cindex.length;
        // mark in workspace for current column
        var mark = jb + 1;
        // B values & index in j
        for (kb0 = bptr[jb], kb1 = bptr[jb + 1], kb = kb0; kb < kb1; kb++) {
            // b row
            ib = bindex[kb];
            // check we need to process values
            if (values) {
                // loop values in a[:,ib]
                for (ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
                    // row
                    ia = aindex[ka];
                    // check value exists in current j
                    if (w[ia] !== mark) {
                        // ia is new entry in j
                        w[ia] = mark;
                        // add i to pattern of C
                        cindex.push(ia);
                        // x(ia) = A
                        x[ia] = mf(bvalues[kb], avalues[ka]);
                    } else {
                        // i exists in C already
                        x[ia] = af(x[ia], mf(bvalues[kb], avalues[ka]));
                    }
                }
            } else {
                // loop values in a[:,ib]
                for (ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
                    // row
                    ia = aindex[ka];
                    // check value exists in current j
                    if (w[ia] !== mark) {
                        // ia is new entry in j
                        w[ia] = mark;
                        // add i to pattern of C
                        cindex.push(ia);
                    }
                }
            }
        }
        // check we need to process matrix values (pattern matrix)
        if (values) {
            // copy values from x to column jb of c
            for (var p0 = cptr[jb], p1 = cindex.length, p = p0; p < p1; p++) {
                // row
                var ic = cindex[p];
                // copy value
                cvalues[p] = x[ic];
            }
        }
    }
    // update ptr
    cptr[bcolumns] = cindex.length;
    // return sparse matrix
    return c;
}})();