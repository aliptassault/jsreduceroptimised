(function(){{
    var hasBigNumbers = _normalize(size);
    var defaultValue = hasBigNumbers ? new type.BigNumber(0) : 0;
    _validate(size);
    if (format) {
        // return a matrix
        var m = matrix(format);
        if (size.length > 0) {
            return m.resize(size, defaultValue);
        }
        return m;
    } else {
        // return an Array
        var arr = [];
        if (size.length > 0) {
            return resize(arr, size, defaultValue);
        }
        return arr;
    }
}})();