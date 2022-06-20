(function(){{
    var pr, rm, x =         $that, Ctor = x.constructor;
    if (!x.d)
        return new Ctor(NaN);
    // cos(0) = cos(-0) = 1
    if (!x.d[0])
        return new Ctor(1);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
    Ctor.rounding = 1;
    x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
}})();