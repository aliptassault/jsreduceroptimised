(function(){{
    for (var i = 0; i < name.length; i++) {
        var c = name.charAt(i);
        var isValidAlpha = function (p) {
            return /^[a-zA-Z]$/.test(p);
        };
        var isDigit = function (c) {
            return c >= '0' && c <= '9';
        };
        if (i === 0 && !isValidAlpha(c))
            throw new Error('Invalid unit name (must begin with alpha character): "' + name + '"');
        if (i > 0 && !(isValidAlpha(c) || isDigit(c)))
            throw new Error('Invalid unit name (only alphanumeric characters are allowed): "' + name + '"');
    }
}})();