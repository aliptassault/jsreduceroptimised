(function(){{
    // rows & columns
    var rows =     $that._size[0];
    var columns =     $that._size[1];
    // calculate density
    return rows !== 0 && columns !== 0 ?     $that._index.length / (rows * columns) : 0;
}})();