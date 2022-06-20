(function(){{
    if (!Array.isArray(a)) {
        throw new TypeError('Array input expected');
    }
    if (a.length === 0) {
        return a;
    }
    var b = [];
    var count = 0;
    b[0] = {
        value: a[0],
        identifier: 0
    };
    for (var i = 1; i < a.length; i++) {
        if (a[i] === a[i - 1]) {
            count++;
        } else {
            count = 0;
        }
        b.push({
            value: a[i],
            identifier: count
        });
    }
    return b;
}})();