(function(){{
    // validate arguments
    if (!isArray(size))
        throw new TypeError('Array expected');
    // matrix to resize
    var m = copy ?     $that.clone() :     $that;
    // resize matrix
    return _resize(m, size, defaultValue);
}})();