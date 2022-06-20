(function(){{
    // rows and columns
    var rows = size[0];
    var columns = size[1];
    // result
    var a = [];
    // vars
    var i, j;
    // initialize array
    for (i = 0; i < rows; i++) {
        a[i] = [];
        for (j = 0; j < columns; j++)
            a[i][j] = 0;
    }
    // loop columns
    for (j = 0; j < columns; j++) {
        // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
        var k0 = ptr[j];
        var k1 = ptr[j + 1];
        // loop k within [k0, k1[
        for (var k = k0; k < k1; k++) {
            // row index
            i = index[k];
            // set value (use one for pattern matrix)
            a[i][j] = values ? copy ? object.clone(values[k]) : values[k] : 1;
        }
    }
    return a;
}})();