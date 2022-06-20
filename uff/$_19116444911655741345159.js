(function(){{
    var k, n, pr, rm, len, x =         $that, Ctor = x.constructor, one = new Ctor(1);
    if (!x.isFinite())
        return new Ctor(x.s ? 1 / 0 : NaN);
    if (x.isZero())
        return one;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
    Ctor.rounding = 1;
    len = x.d.length;
    // Argument reduction: cos(4x) = 1 - 8cos^2(x) + 8cos^4(x) + 1
    // i.e. cos(x) = 1 - cos^2(x/4)(8 - 8cos^2(x/4))
    // Estimate the optimum number of times to use the argument reduction.
    // TODO? Estimation reused from cosine() and may not be optimal here.
    if (len < 32) {
        k = Math.ceil(len / 3);
        n = Math.pow(4, -k).toString();
    } else {
        k = 16;
        n = '2.3283064365386962890625e-10';
    }
    x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
    // Reverse argument reduction
    var cosh2_x, i = k, d8 = new Ctor(8);
    for (; i--;) {
        cosh2_x = x.times(x);
        x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
    }
    return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
}})();