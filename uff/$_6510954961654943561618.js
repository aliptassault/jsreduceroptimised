(function(){{
    // validate arguments
    if (!isArray(size))
        throw new TypeError('Array expected');
    if (size.length !== 2)
        throw new Error('Only two dimensions matrix are supported');
    // check sizes
    size.forEach(function (value) {
        if (!number.isNumber(value) || !number.isInteger(value) || value < 0) {
            throw new TypeError('Invalid size, must contain positive integers ' + '(size: ' + string.format(size) + ')');
        }
    });
    // matrix to resize
    var m = copy ?     $that.clone() :     $that;
    // resize matrix
    return _resize(m, size[0], size[1], defaultValue);
}})();