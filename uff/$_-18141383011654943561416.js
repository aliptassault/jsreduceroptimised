(function(){{
    var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
    if (str === 'Infinity' || str === 'NaN') {
        if (!+str)
            x.s = NaN;
        x.e = NaN;
        x.d = null;
        return x;
    }
    if (isHex.test(str)) {
        base = 16;
        str = str.toLowerCase();
    } else if (isBinary.test(str)) {
        base = 2;
    } else if (isOctal.test(str)) {
        base = 8;
    } else {
        throw Error(invalidArgument + str);
    }
    // Is there a binary exponent part?
    i = str.search(/p/i);
    if (i > 0) {
        p = +str.slice(i + 1);
        str = str.substring(2, i);
    } else {
        str = str.slice(2);
    }
    // Convert `str` as an integer then divide the result by `base` raised to a power such that the
    // fraction part will be restored.
    i = str.indexOf('.');
    isFloat = i >= 0;
    Ctor = x.constructor;
    if (isFloat) {
        str = str.replace('.', '');
        len = str.length;
        i = len - i;
        // log[10](16) = 1.2041... , log[10](88) = 1.9444....
        divisor = intPow(Ctor, new Ctor(base), i, i * 2);
    }
    xd = convertBase(str, base, BASE);
    xe = xd.length - 1;
    // Remove trailing zeros.
    for (i = xe; xd[i] === 0; --i)
        xd.pop();
    if (i < 0)
        return new Ctor(x.s * 0);
    x.e = getBase10Exponent(xd, xe);
    x.d = xd;
    external = false;
    // At what precision to perform the division to ensure exact conversion?
    // maxDecimalIntegerPartDigitCount = ceil(log[10](b) * otherBaseIntegerPartDigitCount)
    // log[10](2) = 0.30103, log[10](8) = 0.90309, log[10](16) = 1.20412
    // E.g. ceil(1.2 * 3) = 4, so up to 4 decimal digits are needed to represent 3 hex int digits.
    // maxDecimalFractionPartDigitCount = {Hex:4|Oct:3|Bin:1} * otherBaseFractionPartDigitCount
    // Therefore using 4 * the number of digits of str will always be enough.
    if (isFloat)
        x = divide(x, divisor, len * 4);
    // Multiply by the binary exponent part if present.
    if (p)
        x = x.times(Math.abs(p) < 54 ? Math.pow(2, p) : Decimal.pow(2, p));
    external = true;
    return x;
}})();