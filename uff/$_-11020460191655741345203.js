(function(){{
    var e, k, pr, r, rm, s, x =         $that, Ctor = x.constructor, yn = +(y = new Ctor(y));
    // Either ±Infinity, NaN or ±0?
    if (!x.d || !y.d || !x.d[0] || !y.d[0])
        return new Ctor(mathpow(+x, yn));
    x = new Ctor(x);
    if (x.eq(1))
        return x;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (y.eq(1))
        return finalise(x, pr, rm);
    // y exponent
    e = mathfloor(y.e / LOG_BASE);
    // If y is a small integer use the 'exponentiation by squaring' algorithm.
    if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
        r = intPow(Ctor, x, k, pr);
        return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
    }
    s = x.s;
    // if x is negative
    if (s < 0) {
        // if y is not an integer
        if (e < y.d.length - 1)
            return new Ctor(NaN);
        // Result is positive if x is negative and the last digit of integer y is even.
        if ((y.d[e] & 1) == 0)
            s = 1;
        // if x.eq(-1)
        if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
            x.s = s;
            return x;
        }
    }
    // Estimate result exponent.
    // x^y = 10^e,  where e = y * log10(x)
    // log10(x) = log10(x_significand) + x_exponent
    // log10(x_significand) = ln(x_significand) / ln(10)
    k = mathpow(+x, yn);
    e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log('0.' + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + '').e;
    // Exponent estimate may be incorrect e.g. x: 0.999999999999999999, y: 2.29, e: 0, r.e: -1.
    // Overflow/underflow?
    if (e > Ctor.maxE + 1 || e < Ctor.minE - 1)
        return new Ctor(e > 0 ? s / 0 : 0);
    external = false;
    Ctor.rounding = x.s = 1;
    // Estimate the extra guard digits needed to ensure five correct rounding digits from
    // naturalLogarithm(x). Example of failure without these extra digits (precision: 10):
    // new Decimal(2.32456).pow('2087987436534566.46411')
    // should be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815
    k = Math.min(12, (e + '').length);
    // r = x^y = exp(y*ln(x))
    r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
    // r may be Infinity, e.g. (0.9999999999999999).pow(-1e+40)
    if (r.d) {
        // Truncate to the required precision plus five rounding digits.
        r = finalise(r, pr + 5, 1);
        // If the rounding digits are [49]9999 or [50]0000 increase the precision by 10 and recalculate
        // the result.
        if (checkRoundingDigits(r.d, pr, rm)) {
            e = pr + 10;
            // Truncate to the increased precision plus five rounding digits.
            r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
            // Check for 14 nines from the 2nd rounding digit (the first rounding digit may be 4 or 9).
            if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 100000000000000) {
                r = finalise(r, pr + 1, 0);
            }
        }
    }
    r.s = s;
    external = true;
    Ctor.rounding = rm;
    return finalise(r, pr, rm);
}})();