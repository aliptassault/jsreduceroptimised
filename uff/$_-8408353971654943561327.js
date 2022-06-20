(function(){{
    var k, pr, rm, len, x =         $that, Ctor = x.constructor;
    if (!x.isFinite() || x.isZero())
        return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
    Ctor.rounding = 1;
    len = x.d.length;
    if (len < 3) {
        x = taylorSeries(Ctor, 2, x, x, true);
    } else {
        // Alternative argument reduction: sinh(3x) = sinh(x)(3 + 4sinh^2(x))
        // i.e. sinh(x) = sinh(x/3)(3 + 4sinh^2(x/3))
        // 3 multiplications and 1 addition
        // Argument reduction: sinh(5x) = sinh(x)(5 + sinh^2(x)(20 + 16sinh^2(x)))
        // i.e. sinh(x) = sinh(x/5)(5 + sinh^2(x/5)(20 + 16sinh^2(x/5)))
        // 4 multiplications and 2 additions
        // Estimate the optimum number of times to use the argument reduction.
        k = 1.4 * Math.sqrt(len);
        k = k > 16 ? 16 : k | 0;
        x = x.times(Math.pow(5, -k));
        x = taylorSeries(Ctor, 2, x, x, true);
        // Reverse argument reduction
        var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
        for (; k--;) {
            sinh2_x = x.times(x);
            x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
        }
    }
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(x, pr, rm, true);
}})();