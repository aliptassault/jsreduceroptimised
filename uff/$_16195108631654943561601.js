(function(){{
    // initialize fields
    matrix._values = [];
    matrix._index = [];
    matrix._ptr = [];
    matrix._datatype = datatype;
    // discover rows & columns, do not use math.size() to avoid looping array twice
    var rows = data.length;
    var columns = 0;
    // equal signature to use
    var eq = equalScalar;
    // zero value
    var zero = 0;
    if (isString(datatype)) {
        // find signature that matches (datatype, datatype)
        eq = typed.find(equalScalar, [
            datatype,
            datatype
        ]) || equalScalar;
        // convert 0 to the same datatype
        zero = typed.convert(0, datatype);
    }
    // check we have rows (empty array)
    if (rows > 0) {
        // column index
        var j = 0;
        do {
            // store pointer to values index
            matrix._ptr.push(matrix._index.length);
            // loop rows
            for (var i = 0; i < rows; i++) {
                // current row
                var row = data[i];
                // check row is an array
                if (isArray(row)) {
                    // update columns if needed (only on first column)
                    if (j === 0 && columns < row.length)
                        columns = row.length;
                    // check row has column
                    if (j < row.length) {
                        // value
                        var v = row[j];
                        // check value != 0
                        if (!eq(v, zero)) {
                            // store value
                            matrix._values.push(v);
                            // index
                            matrix._index.push(i);
                        }
                    }
                } else {
                    // update columns if needed (only on first column)
                    if (j === 0 && columns < 1)
                        columns = 1;
                    // check value != 0 (row is a scalar)
                    if (!eq(row, zero)) {
                        // store value
                        matrix._values.push(row);
                        // index
                        matrix._index.push(i);
                    }
                }
            }
            // increment index
            j++;
        } while (j < columns);
    }
    // store number of values in ptr
    matrix._ptr.push(matrix._index.length);
    // size
    matrix._size = [
        rows,
        columns
    ];
}})();