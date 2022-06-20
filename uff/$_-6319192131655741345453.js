(function(){{
    // rows and columns
    var rows =     $that._size[0];
    var columns =     $that._size[1];
    // density
    var density =     $that.density();
    // rows & columns
    var str = 'Sparse Matrix [' + string.format(rows, options) + ' x ' + string.format(columns, options) + '] density: ' + string.format(density, options) + '\n';
    // loop columns
    for (var j = 0; j < columns; j++) {
        // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
        var k0 =         $that._ptr[j];
        var k1 =         $that._ptr[j + 1];
        // loop k within [k0, k1[
        for (var k = k0; k < k1; k++) {
            // row index
            var i =             $that._index[k];
            // append value
            str += '\n    (' + string.format(i, options) + ', ' + string.format(j, options) + ') ==> ' + (            $that._values ? string.format(            $that._values[k], options) : 'X');
        }
    }
    return str;
}})();