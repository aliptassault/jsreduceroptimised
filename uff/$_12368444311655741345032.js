(function(){{
    var size = type.isMatrix(x) ? x.size() : util.array.size(x);
    switch (size.length) {
    case 1:
        // vector
        if (size[0] == 1) {
            if (type.isMatrix(x)) {
                return matrix([divideScalar(1, x.valueOf()[0])]);
            } else {
                return [divideScalar(1, x[0])];
            }
        } else {
            throw new RangeError('Matrix must be square ' + '(size: ' + util.string.format(size) + ')');
        }
    case 2:
        // two dimensional array
        var rows = size[0];
        var cols = size[1];
        if (rows == cols) {
            if (type.isMatrix(x)) {
                return matrix(_inv(x.valueOf(), rows, cols), x.storage());
            } else {
                // return an Array
                return _inv(x, rows, cols);
            }
        } else {
            throw new RangeError('Matrix must be square ' + '(size: ' + util.string.format(size) + ')');
        }
    default:
        // multi dimensional array
        throw new RangeError('Matrix must be two dimensional ' + '(size: ' + util.string.format(size) + ')');
    }
}})();