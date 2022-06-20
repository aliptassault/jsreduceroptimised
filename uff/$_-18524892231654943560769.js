(function(){{
    // matrix instance
    var me =     $that;
    var recurse = function (value, index) {
        if (isArray(value)) {
            return value.map(function (child, i) {
                return recurse(child, index.concat(i));
            });
        } else {
            return callback(value, index, me);
        }
    };
    // return dense format
    return new DenseMatrix({
        data: recurse(        $that._data, []),
        size: object.clone(        $that._size),
        datatype:         $that._datatype
    });
}})();