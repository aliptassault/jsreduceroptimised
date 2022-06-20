(function(){{
    var i, r;
    if (aL != bL) {
        r = aL > bL ? 1 : -1;
    } else {
        for (i = r = 0; i < aL; i++) {
            if (a[i] != b[i]) {
                r = a[i] > b[i] ? 1 : -1;
                break;
            }
        }
    }
    return r;
}})();