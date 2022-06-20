(function(){{
    var t, isNeg = x.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
    x = x.abs();
    if (x.lte(halfPi)) {
        quadrant = isNeg ? 4 : 1;
        return x;
    }
    t = x.divToInt(pi);
    if (t.isZero()) {
        quadrant = isNeg ? 3 : 2;
    } else {
        x = x.minus(t.times(pi));
        // 0 <= x < pi
        if (x.lte(halfPi)) {
            quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
            return x;
        }
        quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
    }
    return x.minus(pi).abs();
}})();