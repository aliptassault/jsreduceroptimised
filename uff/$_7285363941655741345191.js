(function(){{
    var carry, e, i, k, r, rL, t, xdL, ydL, x =         $that, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
    y.s *= x.s;
    // If either is NaN, ±Infinity or ±0...
    if (!xd || !xd[0] || !yd || !yd[0]) {
        return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd    // Return NaN if either is NaN.
              // Return NaN if x is ±0 and y is ±Infinity, or y is ±0 and x is ±Infinity.
 ? NaN    // Return ±Infinity if either is ±Infinity.
               // Return ±0 if either is ±0.
 : !xd || !yd ? y.s / 0 : y.s * 0);
    }
    e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
    xdL = xd.length;
    ydL = yd.length;
    // Ensure xd points to the longer array.
    if (xdL < ydL) {
        r = xd;
        xd = yd;
        yd = r;
        rL = xdL;
        xdL = ydL;
        ydL = rL;
    }
    // Initialise the result array with zeros.
    r = [];
    rL = xdL + ydL;
    for (i = rL; i--;)
        r.push(0);
    // Multiply!
    for (i = ydL; --i >= 0;) {
        carry = 0;
        for (k = xdL + i; k > i;) {
            t = r[k] + yd[i] * xd[k - i - 1] + carry;
            r[k--] = t % BASE | 0;
            carry = t / BASE | 0;
        }
        r[k] = (r[k] + carry) % BASE | 0;
    }
    // Remove trailing zeros.
    for (; !r[--rL];)
        r.pop();
    if (carry)
        ++e;
    else
        r.shift();
    y.d = r;
    y.e = getBase10Exponent(r, e);
    return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
}})();