(function(){{
    var q, x =         $that, Ctor = x.constructor;
    y = new Ctor(y);
    // Return NaN if x is ±Infinity or NaN, or y is NaN or ±0.
    if (!x.d || !y.s || y.d && !y.d[0])
        return new Ctor(NaN);
    // Return x if y is ±Infinity or x is ±0.
    if (!y.d || x.d && !x.d[0]) {
        return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
    }
    // Prevent rounding of intermediate calculations.
    external = false;
    if (Ctor.modulo == 9) {
        // Euclidian division: q = sign(y) * floor(x / abs(y))
        // result = x - q * y    where  0 <= result < abs(y)
        q = divide(x, y.abs(), 0, 3, 1);
        q.s *= y.s;
    } else {
        q = divide(x, y, 0, Ctor.modulo, 1);
    }
    q = q.times(y);
    external = true;
    return x.minus(q);
}})();