(function(){{
    // check index
    if (!index || index.isIndex !== true) {
        throw new TypeError('Invalid index');
    }
    // get index size and check whether the index contains a single value
    var iSize = index.size(), isScalar = index.isScalar();
    // calculate the size of the submatrix, and convert it into an Array if needed
    var sSize;
    if (type.isMatrix(submatrix)) {
        // submatrix size
        sSize = submatrix.size();
        // use array representation
        submatrix = submatrix.toArray();
    } else {
        // get submatrix size (array, scalar)
        sSize = array.size(submatrix);
    }
    // check index is a scalar
    if (isScalar) {
        // verify submatrix is a scalar
        if (sSize.length !== 0) {
            throw new TypeError('Scalar expected');
        }
        // set value
        matrix.set(index.min(), submatrix, defaultValue);
    } else {
        // validate dimensions, index size must be one or two dimensions
        if (iSize.length !== 1 && iSize.length !== 2) {
            throw new DimensionError(iSize.length, matrix._size.length, '<');
        }
        // check submatrix and index have the same dimensions
        if (sSize.length < iSize.length) {
            // calculate number of missing outer dimensions
            var i = 0;
            var outer = 0;
            while (iSize[i] === 1 && sSize[i] === 1) {
                i++;
            }
            while (iSize[i] === 1) {
                outer++;
                i++;
            }
            // unsqueeze both outer and inner dimensions
            submatrix = array.unsqueeze(submatrix, iSize.length, outer, sSize);
        }
        // check whether the size of the submatrix matches the index size
        if (!object.deepEqual(iSize, sSize)) {
            throw new DimensionError(iSize, sSize, '>');
        }
        // offsets
        var x0 = index.min()[0];
        var y0 = index.min()[1];
        // submatrix rows and columns
        var m = sSize[0];
        var n = sSize[1];
        // loop submatrix
        for (var x = 0; x < m; x++) {
            // loop columns
            for (var y = 0; y < n; y++) {
                // value at i, j
                var v = submatrix[x][y];
                // invoke set (zero value will remove entry from matrix)
                matrix.set([
                    x + x0,
                    y + y0
                ], v, defaultValue);
            }
        }
    }
    return matrix;
}})();