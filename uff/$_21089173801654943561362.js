(function(){{
    var m, n, sd, r, rep, t, x =         $that, d = x.d, e = x.e, s = x.s, Ctor = x.constructor;
    // Negative/NaN/Infinity/zero?
    if (s !== 1 || !d || !d[0]) {
        return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
    }
    external = false;
    // Initial estimate.
    s = Math.sqrt(+x);
    // Math.sqrt underflow/overflow?
    // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
    if (s == 0 || s == 1 / 0) {
        n = digitsToString(d);
        if ((n.length + e) % 2 == 0)
            n += '0';
        s = Math.sqrt(n);
        e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
        if (s == 1 / 0) {
            n = '1e' + e;
        } else {
            n = s.toExponential();
            n = n.slice(0, n.indexOf('e') + 1) + e;
        }
        r = new Ctor(n);
    } else {
        r = new Ctor(s.toString());
    }
    sd = (e = Ctor.precision) + 3;
    // Newton-Raphson iteration.
    for (;;) {
        t = r;
        r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
        // TODO? Replace with for-loop and checkRoundingDigits.
        if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
            n = n.slice(sd - 3, sd + 1);
            // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
            // 4999, i.e. approaching a rounding boundary, continue the iteration.
            if (n == '9999' || !rep && n == '4999') {
                // On the first iteration only, check to see if rounding up gives the exact result as the
                // nines may infinitely repeat.
                if (!rep) {
                    finalise(t, e + 1, 0);
                    if (t.times(t).eq(x)) {
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
                    m = !r.times(r).eq(x);
                }
                break;
            }
        }
    }
    external = true;
    return finalise(r, e, Ctor.rounding, m);
}})();