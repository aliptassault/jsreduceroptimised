(function(){{
    // a arrays
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype;
    // datatype
    var dt;
    // callback signature to use
    var cf = callback;
    // process data types
    if (typeof adt === 'string') {
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
    var cdata = asize.length > 0 ? _iterate(cf, 0, asize, asize[0], adata, b, inverse) : [];
    // c matrix
    return new DenseMatrix({
        data: cdata,
        size: clone(asize),
        datatype: dt
    });
}})();