(function(){{
    if (!number.isNumber(index) || !number.isInteger(index)) {
        throw new TypeError('Index must be an integer (value: ' + index + ')');
    }
    if (index < 0 || typeof length === 'number' && index >= length) {
        throw new IndexError(index, length);
    }
}})();