(function(){{
    // indeces for column j
    var k0 = ptr[j];
    var k1 = ptr[j + 1];
    // loop
    for (var k = k0; k < k1; k++) {
        // invoke callback
        callback(index[k], values[k]);
    }
}})();