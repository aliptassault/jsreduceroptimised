(function(){{
    var e, m, n, r, rep, s, sd, t, t3, t3plusx, x =         $that, Ctor = x.constructor;
    if (!x.isFinite() || x.isZero())
        return new Ctor(x);
    external = false;
    // Initial estimate.
    s = x.s * Math.pow(x.s * x, 1 / 3);
    // Math.cbrt underflow/overflow?
    // Pass x to Math.pow as integer, then adjust the exponent of the result.
    if (!s || Math.abs(s) == 1 / 0) {
        n = digitsToString(x.d);
        e = x.e;
        // Adjust n exponent so it is a multiple of 3 away from x exponent.
        if (s = (e - n.length + 1) % 3)
            n += s == 1 || s == -2 ? '0' : '00';
        s = Math.pow(n, 1 / 3);
        // Rarely, e may be one less than the result exponent value.
        e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
        if (s == 1 / 0) {
            n = '5e' + e;
        } else {
            n = s.toExponential();
            n = n.slice(0, n.indexOf('e') + 1) + e;
        }
        r = new Ctor(n);
        r.s = x.s;
    } else {
        r = new Ctor(s.toString());
    }
    sd = (e = Ctor.precision) + 3;
    // Halley's method.
    // TODO? Compare Newton's method.
    for (;;) {
        t = r;
        t3 = t.times(t).times(t);
        t3plusx = t3.plus(x);
        r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
        // TODO? Replace with for-loop and checkRoundingDigits.
        if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
            n = n.slice(sd - 3, sd + 1);
            // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or 4999
            // , i.e. approaching a rounding boundary, continue the iteration.
            if (n == '9999' || !rep && n == '4999') {
                // On the first iteration only, check to see if rounding up gives the exact result as the
                // nines may infinitely repeat.
                if (!rep) {
                    finalise(t, e + 1, 0);
                    if (t.times(t).times(t).eq(x)) {
                        r = t;
                        break;
                    }
                }
                sd += 4;
                rep = 1;
            } else {
                // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
                // If not, then there are further digits and m will be truthy.
                if (!+n || !+n.slice(1) && n.charAt(0) == '5') {
                    // Truncate to the first rounding digit.
                    finalise(r, e + 1, 1);
                    m = !r.times(r).times(r).eq(x);
                }
                break;
            }
        }
    }
    external = true;
    return finalise(r, e, Ctor.rounding, m);
}})();