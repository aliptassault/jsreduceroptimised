(function(){{
    if (!index || index.isIndex !== true) {
        throw new TypeError('Invalid index');
    }
    // get index size and check whether the index contains a single value
    var iSize = index.size(), isScalar = index.isScalar();
    // calculate the size of the submatrix, and convert it into an Array if needed
    var sSize;
    if (type.isMatrix(submatrix)) {
        sSize = submatrix.size();
        submatrix = submatrix.valueOf();
    } else {
        sSize = array.size(submatrix);
    }
    if (isScalar) {
        // set a scalar
        // check whether submatrix is a scalar
        if (sSize.length !== 0) {
            throw new TypeError('Scalar expected');
        }
        matrix.set(index.min(), submatrix, defaultValue);
    } else {
        // set a submatrix
        // validate dimensions
        if (iSize.length < matrix._size.length) {
            throw new DimensionError(iSize.length, matrix._size.length, '<');
        }
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
        // enlarge matrix when needed
        var size = index.max().map(function (i) {
            return i + 1;
        });
        _fit(matrix, size, defaultValue);
        // insert the sub matrix
        var dims = iSize.length, dim = 0;
        _setSubmatrix(matrix._data, index, submatrix, dims, dim);
    }
    return matrix;
}})();