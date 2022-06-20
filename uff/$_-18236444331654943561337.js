(function(){{
    var i, j, k, n, px, t, r, wpr, x2, x =         $that, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
    if (!x.isFinite()) {
        if (!x.s)
            return new Ctor(NaN);
        if (pr + 4 <= PI_PRECISION) {
            r = getPi(Ctor, pr + 4, rm).times(0.5);
            r.s = x.s;
            return r;
        }
    } else if (x.isZero()) {
        return new Ctor(x);
    } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
        r = getPi(Ctor, pr + 4, rm).times(0.25);
        r.s = x.s;
        return r;
    }
    Ctor.precision = wpr = pr + 10;
    Ctor.rounding = 1;
    // TODO? if (x >= 1 && pr <= PI_PRECISION) atan(x) = halfPi * x.s - atan(1 / x);
    // Argument reduction
    // Ensure |x| < 0.42
    // atan(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))
    k = Math.min(28, wpr / LOG_BASE + 2 | 0);
    for (i = k; i; --i)
        x = x.div(x.times(x).plus(1).sqrt().plus(1));
    external = false;
    j = Math.ceil(wpr / LOG_BASE);
    n = 1;
    x2 = x.times(x);
    r = new Ctor(x);
    px = x;
    // atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
    for (; i !== -1;) {
        px = px.times(x2);
        t = r.minus(px.div(n += 2));
        px = px.times(x2);
        r = t.plus(px.div(n += 2));
        if (r.d[j] !== void 0)
            for (i = j; r.d[i] === t.d[i] && i--;);
    }
    if (k)
        r = r.times(2 << k - 1);
    external = true;
    return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
}})();