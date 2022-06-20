(function(){{
    var n = Number(x);
    if (isNaN(n)) {
        throw new Error('Cannot convert "' + x + '" to a number');
    }
    return n;
}})();