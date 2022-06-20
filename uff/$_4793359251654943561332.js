(function(){{
    var pr, rm, x =         $that, Ctor = x.constructor;
    if (x.lte(1))
        return new Ctor(x.eq(1) ? 0 : NaN);
    if (!x.isFinite())
        return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
    Ctor.rounding = 1;
    external = false;
    x = x.times(x).minus(1).sqrt().plus(x);
    external = true;
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.ln();
}})();