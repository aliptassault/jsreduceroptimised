(function(){{
    // check it is a pattern matrix
    if (!        $that._values)
        throw new Error('Cannot invoke forEach on a Pattern only matrix');
    // matrix instance
    var me =     $that;
    // rows and columns
    var rows =     $that._size[0];
    var columns =     $that._size[1];
    // loop columns
    for (var j = 0; j < columns; j++) {
        // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
        var k0 =         $that._ptr[j];
        var k1 =         $that._ptr[j + 1];
        // column pointer
        var p = 0;
        // loop k within [k0, k1[
        for (var k = k0; k < k1; k++) {
            // row index
            var i =             $that._index[k];
            // check we need to process zeros
            if (!skipZeros) {
                // zero values
                for (var x = p; x < i; x++)
                    callback(0, [
                        x,
                        j
                    ], me);
            }
            // value @ k
            callback(            $that._values[k], [
                i,
                j
            ], me);
            // update pointer
            p = i + 1;
        }
        // check we need to process zeros
        if (!skipZeros) {
            // zero values
            for (var y = p; y < rows; y++)
                callback(0, [
                    y,
                    j
                ], me);
        }
    }
}})();