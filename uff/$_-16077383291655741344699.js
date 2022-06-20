(function(){{
    if (!type.isIndex(index)) {
        throw new TypeError('Invalid index');
    }
    var isScalar = index.isScalar();
    if (isScalar) {
        // return a scalar
        return matrix.get(index.min());
    } else {
        // validate dimensions
        var size = index.size();
        if (size.length != matrix._size.length) {
            throw new DimensionError(size.length, matrix._size.length);
        }
        // validate if any of the ranges in the index is out of range
        var min = index.min();
        var max = index.max();
        for (var i = 0, ii = matrix._size.length; i < ii; i++) {
            validateIndex(min[i], matrix._size[i]);
            validateIndex(max[i], matrix._size[i]);
        }
        // retrieve submatrix
        // TODO: more efficient when creating an empty matrix and setting _data and _size manually
        return new DenseMatrix(_getSubmatrix(matrix._data, index, size.length, 0), matrix._datatype);
    }
}})();