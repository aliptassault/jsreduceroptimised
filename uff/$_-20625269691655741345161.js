(function(){{
    var pr, rm, x =         $that, Ctor = x.constructor;
    if (!x.isFinite())
        return new Ctor(x.s);
    if (x.isZero())
        return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 7;
    Ctor.rounding = 1;
    return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
}})();