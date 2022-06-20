(function(){{
    y = new    $that(y);
    x = new    $that(x);
    var r, pr =         $that.precision, rm =         $that.rounding, wpr = pr + 4;
    // Either NaN
    if (!y.s || !x.s) {
        r = new        $that(NaN);    // Both ±Infinity
    } else if (!y.d && !x.d) {
        r = getPi(        $that, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
        r.s = y.s;    // x is ±Infinity or y is ±0
    } else if (!x.d || y.isZero()) {
        r = x.s < 0 ? getPi(        $that, pr, rm) : new        $that(0);
        r.s = y.s;    // y is ±Infinity or x is ±0
    } else if (!y.d || x.isZero()) {
        r = getPi(        $that, wpr, 1).times(0.5);
        r.s = y.s;    // Both non-zero and finite
    } else if (x.s < 0) {
                $that.precision = wpr;
                $that.rounding = 1;
        r =         $that.atan(divide(y, x, wpr, 1));
        x = getPi(        $that, wpr, 1);
                $that.precision = pr;
                $that.rounding = rm;
        r = y.s < 0 ? r.minus(x) : r.plus(x);
    } else {
        r =         $that.atan(divide(y, x, wpr, 1));
    }
    return r;
}})();