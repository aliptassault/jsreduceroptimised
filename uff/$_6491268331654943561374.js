(function(){{
    var x =         $that, Ctor = x.constructor;
    x = new Ctor(x);
    if (y == null) {
        // If x is not finite, return x.
        if (!x.d)
            return x;
        y = new Ctor(1);
        rm = Ctor.rounding;
    } else {
        y = new Ctor(y);
        if (rm !== void 0)
            checkInt32(rm, 0, 8);
        // If x is not finite, return x if y is not NaN, else NaN.
        if (!x.d)
            return y.s ? x : y;
        // If y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.
        if (!y.d) {
            if (y.s)
                y.s = x.s;
            return y;
        }
    }
    // If y is not zero, calculate the nearest multiple of y to x.
    if (y.d[0]) {
        external = false;
        if (rm < 4)
            rm = [
                4,
                5,
                7,
                8
            ][rm];
        x = divide(x, y, 0, rm, 1).times(y);
        external = true;
        finalise(x);    // If y is zero, return zero with the sign of x.
    } else {
        y.s = x.s;
        x = y;
    }
    return x;
}})();