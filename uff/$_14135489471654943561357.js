(function(){{
    var carry, d, e, i, k, len, pr, rm, xd, yd, x =         $that, Ctor = x.constructor;
    y = new Ctor(y);
    // If either is not finite...
    if (!x.d || !y.d) {
        // Return NaN if either is NaN.
        if (!x.s || !y.s)
            y = new Ctor(NaN);    // Return x if y is finite and x is ±Infinity.
                                  // Return x if both are ±Infinity with the same sign.
                                  // Return NaN if both are ±Infinity with different signs.
                                  // Return y if x is finite and y is ±Infinity.
        else if (!x.d)
            y = new Ctor(y.d || x.s === y.s ? x : NaN);
        return y;
    }
    // If signs differ...
    if (x.s != y.s) {
        y.s = -y.s;
        return x.minus(y);
    }
    xd = x.d;
    yd = y.d;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    // If either is zero...
    if (!xd[0] || !yd[0]) {
        // Return x if y is zero.
        // Return y if y is non-zero.
        if (!yd[0])
            y = new Ctor(x);
        return external ? finalise(y, pr, rm) : y;
    }
    // x and y are finite, non-zero numbers with the same sign.
    // Calculate base 1e7 exponents.
    k = mathfloor(x.e / LOG_BASE);
    e = mathfloor(y.e / LOG_BASE);
    xd = xd.slice();
    i = k - e;
    // If base 1e7 exponents differ...
    if (i) {
        if (i < 0) {
            d = xd;
            i = -i;
            len = yd.length;
        } else {
            d = yd;
            e = k;
            len = xd.length;
        }
        // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
        k = Math.ceil(pr / LOG_BASE);
        len = k > len ? k + 1 : len + 1;
        if (i > len) {
            i = len;
            d.length = 1;
        }
        // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
        d.reverse();
        for (; i--;)
            d.push(0);
        d.reverse();
    }
    len = xd.length;
    i = yd.length;
    // If yd is longer than xd, swap xd and yd so xd points to the longer array.
    if (len - i < 0) {
        i = len;
        d = yd;
        yd = xd;
        xd = d;
    }
    // Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
    for (carry = 0; i;) {
        carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
        xd[i] %= BASE;
    }
    if (carry) {
        xd.unshift(carry);
        ++e;
    }
    // Remove trailing zeros.
    // No need to check for zero, as +x + +y != 0 && -x + -y != 0
    for (len = xd.length; xd[--len] == 0;)
        xd.pop();
    y.d = xd;
    y.e = getBase10Exponent(xd, e);
    return external ? finalise(y, pr, rm) : y;
}})();