(function(){{
    if (!isArray(size))
        throw new TypeError('Array expected, size parameter');
    if (size.length !== 2)
        throw new Error('Only two dimensions matrix are supported');
    // map size & validate
    size = size.map(function (s) {
        // check it is a big number
        if (type.isBigNumber(s)) {
            // convert it
            s = s.toNumber();
        }
        // validate arguments
        if (!isNumber(s) || !isInteger(s) || s < 1) {
            throw new Error('Size values must be positive integers');
        }
        return s;
    });
    // validate k if any
    if (k) {
        // convert BigNumber to a number
        if (type.isBigNumber(k))
            k = k.toNumber();
        // is must be an integer
        if (!isNumber(k) || !isInteger(k)) {
            throw new TypeError('The parameter k must be an integer number');
        }
    } else {
        // default value
        k = 0;
    }
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
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;
    // rows and columns
    var rows = size[0];
    var columns = size[1];
    // number of non-zero items
    var n = Math.min(rows - kSub, columns - kSuper);
    // value extraction function
    var _value;
    // check value
    if (isArray(value)) {
        // validate array
        if (value.length !== n) {
            // number of values in array must be n
            throw new Error('Invalid value array length');
        }
        // define function
        _value = function (i) {
            // return value @ i
            return value[i];
        };
    } else if (type.isMatrix(value)) {
        // matrix size
        var ms = value.size();
        // validate matrix
        if (ms.length !== 1 || ms[0] !== n) {
            // number of values in array must be n
            throw new Error('Invalid matrix length');
        }
        // define function
        _value = function (i) {
            // return value @ i
            return value.get([i]);
        };
    } else {
        // define function
        _value = function () {
            // return value
            return value;
        };
    }
    // create arrays
    var values = [];
    var index = [];
    var ptr = [];
    // loop items
    for (var j = 0; j < columns; j++) {
        // number of rows with value
        ptr.push(values.length);
        // diagonal index
        var i = j - kSuper;
        // check we need to set diagonal value
        if (i >= 0 && i < n) {
            // get value @ i
            var v = _value(i);
            // check for zero
            if (!eq(v, zero)) {
                // column
                index.push(i + kSub);
                // add value
                values.push(v);
            }
        }
    }
    // last value should be number of values
    ptr.push(values.length);
    // create SparseMatrix
    return new SparseMatrix({
        values: values,
        index: index,
        ptr: ptr,
        size: [
            rows,
            columns
        ]
    });
}})();