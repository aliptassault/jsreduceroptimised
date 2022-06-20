(function(){{
    // a arrays
    var values = m._values;
    var index = m._index;
    var ptr = m._ptr;
    // loop values in column j
    for (var k = ptr[j], k1 = ptr[j + 1]; k < k1; k++) {
        // row
        var i = index[k];
        // update workspace
        w[i] = mark;
        x[i] = values[k];
    }
}})();