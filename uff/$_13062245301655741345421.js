(function(){{
    if (!(        $that instanceof SparseMatrix))
        throw new SyntaxError('Constructor must be called with the new operator');
    if (datatype && !isString(datatype))
        throw new Error('Invalid datatype: ' + datatype);
    if (type.isMatrix(data)) {
        // create from matrix
        _createFromMatrix(        $that, data, datatype);
    } else if (data && isArray(data.index) && isArray(data.ptr) && isArray(data.size)) {
        // initialize fields
                $that._values = data.values;
                $that._index = data.index;
                $that._ptr = data.ptr;
                $that._size = data.size;
                $that._datatype = datatype || data.datatype;
    } else if (isArray(data)) {
        // create from array
        _createFromArray(        $that, data, datatype);
    } else if (data) {
        // unsupported type
        throw new TypeError('Unsupported type of data (' + util.types.type(data) + ')');
    } else {
        // nothing provided
                $that._values = [];
                $that._index = [];
                $that._ptr = [0];
                $that._size = [
            0,
            0
        ];
                $that._datatype = datatype;
    }
}})();