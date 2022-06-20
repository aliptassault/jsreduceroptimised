(function(){{
    // validate arguments
    if (!isArray(size))
        throw new TypeError('Array expected');
    if (size.length !== 2)
        throw new Error('Sparse matrices can only be reshaped in two dimensions');
    // check sizes
    size.forEach(function (value) {
        if (!number.isNumber(value) || !number.isInteger(value) || value < 0) {
            throw new TypeError('Invalid size, must contain positive integers ' + '(size: ' + string.format(size) + ')');
        }
    });
    // m * n must not change
    if (        $that._size[0] *        $that._size[1] !== size[0] * size[1]) {
        throw new Error('Reshaping sparse matrix will result in the wrong number of elements');
    }
    // matrix to reshape
    var m = copy ?     $that.clone() :     $that;
    // return unchanged if the same shape
    if (        $that._size[0] === size[0] &&        $that._size[1] === size[1]) {
        return m;
    }
    // Convert to COO format (generate a column index)
    var colIndex = [];
    for (var i = 0; i < m._ptr.length; i++) {
        for (var j = 0; j < m._ptr[i + 1] - m._ptr[i]; j++) {
            colIndex.push(i);
        }
    }
    // Clone the values array
    var values = m._values.slice();
    // Clone the row index array
    var rowIndex = m._index.slice();
    // Transform the (row, column) indices
    for (var i = 0; i < m._index.length; i++) {
        var r1 = rowIndex[i];
        var c1 = colIndex[i];
        var flat = r1 * m._size[1] + c1;
        colIndex[i] = flat % size[1];
        rowIndex[i] = Math.floor(flat / size[1]);
    }
    // Now reshaping is supposed to preserve the row-major order, BUT these sparse matrices are stored
    // in column-major order, so we have to reorder the value array now. One option is to use a multisort,
    // sorting several arrays based on some other array.
    // OR, we could easily just:
    // 1. Remove all values from the matrix
    m._values.length = 0;
    m._index.length = 0;
    m._ptr.length = size[1] + 1;
    m._size = size.slice();
    for (var i = 0; i < m._ptr.length; i++) {
        m._ptr[i] = 0;
    }
    // 2. Re-insert all elements in the proper order (simplified code from SparseMatrix.prototype.set)
    // This step is probably the most time-consuming
    for (var h = 0; h < values.length; h++) {
        var i = rowIndex[h];
        var j = colIndex[h];
        var v = values[h];
        var k = _getValueIndex(i, m._ptr[j], m._ptr[j + 1], m._index);
        _insert(k, i, j, v, m._values, m._index, m._ptr);
    }
    // The value indices are inserted out of order, but apparently that's... still OK?
    return m;
}})();