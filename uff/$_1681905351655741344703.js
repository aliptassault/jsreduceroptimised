(function(){{
    // check size
    if (size.length === 0) {
        // first value in matrix
        var v = matrix._data;
        // go deep
        while (isArray(v)) {
            v = v[0];
        }
        return v;
    }
    // resize matrix
    matrix._size = size.slice(0);
    // copy the array
    matrix._data = array.resize(matrix._data, matrix._size, defaultValue);
    // return matrix
    return matrix;
}})();