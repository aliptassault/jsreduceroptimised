(function(){{
    if (!Array.isArray(a)) {
        throw new TypeError('Array input expected');
    }
    if (a.length === 0) {
        return a;
    }
    var b = [];
    for (var i = 0; i < a.length; i++) {
        b.push(a[i].value);
    }
    return b;
}})();