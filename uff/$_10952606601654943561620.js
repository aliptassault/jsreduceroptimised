(function(){{
    // value to insert at the time of growing matrix
    var value = defaultValue || 0;
    // equal signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;
    if (isString(matrix._datatype)) {
        // find signature that matches (datatype, datatype)
        eq = typed.find(equalScalar, [
            matrix._datatype,
            matrix._datatype
        ]) || equalScalar;
        // convert 0 to the same datatype
        zero = typed.convert(0, matrix._datatype);
        // convert value to the same datatype
        value = typed.convert(value, matrix._datatype);
    }
    // should we insert the value?
    var ins = !eq(value, zero);
    // old columns and rows
    var r = matrix._size[0];
    var c = matrix._size[1];
    var i, j, k;
    // check we need to increase columns
    if (columns > c) {
        // loop new columns
        for (j = c; j < columns; j++) {
            // update matrix._ptr for current column
            matrix._ptr[j] = matrix._values.length;
            // check we need to insert matrix._values
            if (ins) {
                // loop rows
                for (i = 0; i < r; i++) {
                    // add new matrix._values
                    matrix._values.push(value);
                    // update matrix._index
                    matrix._index.push(i);
                }
            }
        }
        // store number of matrix._values in matrix._ptr
        matrix._ptr[columns] = matrix._values.length;
    } else if (columns < c) {
        // truncate matrix._ptr
        matrix._ptr.splice(columns + 1, c - columns);
        // truncate matrix._values and matrix._index
        matrix._values.splice(matrix._ptr[columns], matrix._values.length);
        matrix._index.splice(matrix._ptr[columns], matrix._index.length);
    }
    // update columns
    c = columns;
    // check we need to increase rows
    if (rows > r) {
        // check we have to insert values
        if (ins) {
            // inserts
            var n = 0;
            // loop columns
            for (j = 0; j < c; j++) {
                // update matrix._ptr for current column
                matrix._ptr[j] = matrix._ptr[j] + n;
                // where to insert matrix._values
                k = matrix._ptr[j + 1] + n;
                // pointer
                var p = 0;
                // loop new rows, initialize pointer
                for (i = r; i < rows; i++, p++) {
                    // add value
                    matrix._values.splice(k + p, 0, value);
                    // update matrix._index
                    matrix._index.splice(k + p, 0, i);
                    // increment inserts
                    n++;
                }
            }
            // store number of matrix._values in matrix._ptr
            matrix._ptr[c] = matrix._values.length;
        }
    } else if (rows < r) {
        // deletes
        var d = 0;
        // loop columns
        for (j = 0; j < c; j++) {
            // update matrix._ptr for current column
            matrix._ptr[j] = matrix._ptr[j] - d;
            // where matrix._values start for next column
            var k0 = matrix._ptr[j];
            var k1 = matrix._ptr[j + 1] - d;
            // loop matrix._index
            for (k = k0; k < k1; k++) {
                // row
                i = matrix._index[k];
                // check we need to delete value and matrix._index
                if (i > rows - 1) {
                    // remove value
                    matrix._values.splice(k, 1);
                    // remove item from matrix._index
                    matrix._index.splice(k, 1);
                    // increase deletes
                    d++;
                }
            }
        }
        // update matrix._ptr for current column
        matrix._ptr[j] = matrix._values.length;
    }
    // update matrix._size
    matrix._size[0] = rows;
    matrix._size[1] = columns;
    // return matrix
    return matrix;
}})();