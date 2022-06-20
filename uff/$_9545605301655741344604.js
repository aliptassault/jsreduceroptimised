(function(){{
    if (!type.isIndex(index)) {
        // TODO: better error message
        throw new TypeError('Index expected');
    }
    if (index.size().length != 1) {
        throw new DimensionError(index.size().length, 1);
    }
    // validate whether the range is out of range
    var strLen = str.length;
    validateIndex(index.min()[0], strLen);
    validateIndex(index.max()[0], strLen);
    var range = index.dimension(0);
    var substr = '';
    range.forEach(function (v) {
        substr += str.charAt(v);
    });
    return substr;
}})();