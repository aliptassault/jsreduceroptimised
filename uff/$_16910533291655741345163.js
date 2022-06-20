(function(){{
    var halfPi, x =         $that, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
    if (k !== -1) {
        return k === 0    // |x| is 1
 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0)    // |x| > 1 or x is NaN
 : new Ctor(NaN);
    }
    if (x.isZero())
        return getPi(Ctor, pr + 4, rm).times(0.5);
    // TODO? Special case acos(0.5) = pi/3 and acos(-0.5) = 2*pi/3
    Ctor.precision = pr + 6;
    Ctor.rounding = 1;
    x = x.asin();
    halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return halfPi.minus(x);
}})();