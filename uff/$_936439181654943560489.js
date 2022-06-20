(function(){{
    if (isNaN(value) || !isFinite(value)) {
        return String(value);
    }
    var rounded = exports.roundDigits(exports.splitNumber(value), precision);
    var e = rounded.exponent;
    var c = rounded.coefficients;
    // find nearest lower multiple of 3 for exponent
    var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3;
    // concatenate coefficients with necessary zeros
    var significandsDiff = e >= 0 ? e : Math.abs(newExp);
    // add zeros if necessary (for ex: 1e+8)
    if (c.length - 1 < significandsDiff)
        c = c.concat(zeros(significandsDiff - (c.length - 1)));
    // find difference in exponents
    var expDiff = Math.abs(e - newExp);
    var decimalIdx = 1;
    // push decimal index over by expDiff times
    while (--expDiff >= 0)
        decimalIdx++;
    // if all coefficient values are zero after the decimal point, don't add a decimal value.
    // otherwise concat with the rest of the coefficients
    var decimals = c.slice(decimalIdx).join('');
    var decimalVal = decimals.match(/[1-9]/) ? '.' + decimals : '';
    var str = c.slice(0, decimalIdx).join('') + decimalVal + 'e' + (e >= 0 ? '+' : '') + newExp.toString();
    return rounded.sign + str;
}})();