(function(){{
    var halfPi, k, pr, rm, x =         $that, Ctor = x.constructor;
    if (x.isZero())
        return new Ctor(x);
    k = x.abs().cmp(1);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (k !== -1) {
        // |x| is 1
        if (k === 0) {
            halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
            halfPi.s = x.s;
            return halfPi;
        }
        // |x| > 1 or x is NaN
        return new Ctor(NaN);
    }
    // TODO? Special case asin(1/2) = pi/6 and asin(-1/2) = -pi/6
    Ctor.precision = pr + 6;
    Ctor.rounding = 1;
    x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.times(2);
}})();