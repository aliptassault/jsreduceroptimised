(function(){{
    if (isNaN(value) || !isFinite(value)) {
        return String(value);
    }
    // round if needed, else create a clone
    var split = exports.splitNumber(value);
    var rounded = precision ? exports.roundDigits(split, precision) : split;
    var c = rounded.coefficients;
    var e = rounded.exponent;
    // append zeros if needed
    if (c.length < precision) {
        c = c.concat(zeros(precision - c.length));
    }
    // format as `C.CCCe+EEE` or `C.CCCe-EEE`
    var first = c.shift();
    return rounded.sign + first + (c.length > 0 ? '.' + c.join('') : '') + 'e' + (e >= 0 ? '+' : '') + e;
}})();