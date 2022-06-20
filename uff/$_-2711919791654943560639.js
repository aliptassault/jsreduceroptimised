(function(){{
    if (!index || index.isIndex !== true) {
        // TODO: better error message
        throw new TypeError('Index expected');
    }
    if (index.size().length != 1) {
        throw new DimensionError(index.size().length, 1);
    }
    if (defaultValue !== undefined) {
        if (typeof defaultValue !== 'string' || defaultValue.length !== 1) {
            throw new TypeError('Single character expected as defaultValue');
        }
    } else {
        defaultValue = ' ';
    }
    var range = index.dimension(0);
    var len = range.size()[0];
    if (len != replacement.length) {
        throw new DimensionError(range.size()[0], replacement.length);
    }
    // validate whether the range is out of range
    var strLen = str.length;
    validateIndex(index.min()[0]);
    validateIndex(index.max()[0]);
    // copy the string into an array with characters
    var chars = [];
    for (var i = 0; i < strLen; i++) {
        chars[i] = str.charAt(i);
    }
    range.forEach(function (v, i) {
        chars[v] = replacement.charAt(i[0]);
    });
    // initialize undefined characters with a space
    if (chars.length > strLen) {
        for (i = strLen - 1, len = chars.length; i < len; i++) {
            if (!chars[i]) {
                chars[i] = defaultValue;
            }
        }
    }
    return chars.join('');
}})();