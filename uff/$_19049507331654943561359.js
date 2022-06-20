(function(){{
    var k, x =         $that;
    if (z !== void 0 && z !== !!z && z !== 1 && z !== 0)
        throw Error(invalidArgument + z);
    if (x.d) {
        k = getPrecision(x.d);
        if (z && x.e + 1 > k)
            k = x.e + 1;
    } else {
        k = NaN;
    }
    return k;
}})();