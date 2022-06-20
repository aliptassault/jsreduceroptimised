(function(){{
    // a arrays
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype;
    // b arrays
    var bdata = b._data;
    var bsize = b._size;
    var bdt = b._datatype;
    // c arrays
    var csize = [];
    // validate dimensions
    if (asize.length !== bsize.length)
        throw new DimensionError(asize.length, bsize.length);
    // validate each one of the dimension sizes
    for (var s = 0; s < asize.length; s++) {
        // must match
        if (asize[s] !== bsize[s])
            throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
        // update dimension in c
        csize[s] = asize[s];
    }
    // datatype
    var dt;
    // callback signature to use
    var cf = callback;
    // process data types
    if (typeof adt === 'string' && adt === bdt) {
        // datatype
        dt = adt;
        // convert b to the same datatype
        b = typed.convert(b, dt);
        // callback
        cf = typed.find(callback, [
            dt,
            dt
        ]);
    }
    // populate cdata, iterate through dimensions
    var cdata = csize.length > 0 ? _iterate(cf, 0, csize, csize[0], adata, bdata) : [];
    // c matrix
    return new DenseMatrix({
        data: cdata,
        size: csize,
        datatype: dt
    });
}})();