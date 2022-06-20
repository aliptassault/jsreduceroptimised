(function(){{
    var denominator, guard, j, pow, sum, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
    // 0/NaN/Infinity?
    if (!x.d || !x.d[0] || x.e > 17) {
        return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
    }
    if (sd == null) {
        external = false;
        wpr = pr;
    } else {
        wpr = sd;
    }
    t = new Ctor(0.03125);
    // while abs(x) >= 0.1
    while (x.e > -2) {
        // x = x / 2^5
        x = x.times(t);
        k += 5;
    }
    // Use 2 * log10(2^k) + 5 (empirically derived) to estimate the increase in precision
    // necessary to ensure the first 4 rounding digits are correct.
    guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
    wpr += guard;
    denominator = pow = sum = new Ctor(1);
    Ctor.precision = wpr;
    for (;;) {
        pow = finalise(pow.times(x), wpr, 1);
        denominator = denominator.times(++i);
        t = sum.plus(divide(pow, denominator, wpr, 1));
        if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
            j = k;
            while (j--)
                sum = finalise(sum.times(sum), wpr, 1);
            // Check to see if the first 4 rounding digits are [49]999.
            // If so, repeat the summation with a higher precision, otherwise
            // e.g. with precision: 18, rounding: 1
            // exp(18.404272462595034083567793919843761) = 98372560.1229999999 (should be 98372560.123)
            // `wpr - guard` is the index of first rounding digit.
            if (sd == null) {
                if (rep < 3 && checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
                    Ctor.precision = wpr += 10;
                    denominator = pow = t = new Ctor(1);
                    i = 0;
                    rep++;
                } else {
                    return finalise(sum, Ctor.precision = pr, rm, external = true);
                }
            } else {
                Ctor.precision = pr;
                return sum;
            }
        }
        sum = t;
    }
}})();