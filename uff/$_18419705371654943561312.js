(function(){{
    var i, j, xdL, ydL, x =         $that, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
    // Either NaN or ±Infinity?
    if (!xd || !yd) {
        return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
    }
    // Either zero?
    if (!xd[0] || !yd[0])
        return xd[0] ? xs : yd[0] ? -ys : 0;
    // Signs differ?
    if (xs !== ys)
        return xs;
    // Compare exponents.
    if (x.e !== y.e)
        return x.e > y.e ^ xs < 0 ? 1 : -1;
    xdL = xd.length;
    ydL = yd.length;
    // Compare digit by digit.
    for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
        if (xd[i] !== yd[i])
            return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
    }
    // Compare lengths.
    return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
}})();