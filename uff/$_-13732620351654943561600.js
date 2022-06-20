(function(){{
    // check matrix type
    if (source.type === 'SparseMatrix') {
        // clone arrays
        matrix._values = source._values ? object.clone(source._values) : undefined;
        matrix._index = object.clone(source._index);
        matrix._ptr = object.clone(source._ptr);
        matrix._size = object.clone(source._size);
        matrix._datatype = datatype || source._datatype;
    } else {
        // build from matrix data
        _createFromArray(matrix, source.valueOf(), datatype || source._datatype);
    }
}})();