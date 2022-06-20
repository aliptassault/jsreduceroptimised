(function(){{
    var m = new SparseMatrix({
        values:         $that._values ? object.clone(        $that._values) : undefined,
        index: object.clone(        $that._index),
        ptr: object.clone(        $that._ptr),
        size: object.clone(        $that._size),
        datatype:         $that._datatype
    });
    return m;
}})();