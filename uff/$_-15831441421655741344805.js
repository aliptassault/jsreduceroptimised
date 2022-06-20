(function(){{
    if (dim < concatDim) {
        // recurse into next dimension
        if (a.length != b.length) {
            throw new DimensionError(a.length, b.length);
        }
        var c = [];
        for (var i = 0; i < a.length; i++) {
            c[i] = _concat(a[i], b[i], concatDim, dim + 1);
        }
        return c;
    } else {
        // concatenate this dimension
        return a.concat(b);
    }
}})();