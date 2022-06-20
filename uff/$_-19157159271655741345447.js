(function(){{
    // check it is a pattern matrix
    if (!        $that._values)
        throw new Error('Cannot invoke map on a Pattern only matrix');
    // matrix instance
    var me =     $that;
    // rows and columns
    var rows =     $that._size[0];
    var columns =     $that._size[1];
    // invoke callback
    var invoke = function (v, i, j) {
        // invoke callback
        return callback(v, [
            i,
            j
        ], me);
    };
    // invoke _map
    return _map(    $that, 0, rows - 1, 0, columns - 1, invoke, skipZeros);
}})();