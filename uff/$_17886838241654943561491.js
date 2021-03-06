(function(){{
    if (typeof options === 'function') {
        // handle format(value, fn)
        return options(value);
    }
    // handle special cases
    if (!value.isFinite()) {
        return value.isNaN() ? 'NaN' : value.gt(0) ? 'Infinity' : '-Infinity';
    }
    // default values for options
    var notation = 'auto';
    var precision = undefined;
    if (options !== undefined) {
        // determine notation from options
        if (options.notation) {
            notation = options.notation;
        }
        // determine precision from options
        if (typeof options === 'number') {
            precision = options;
        } else if (options.precision) {
            precision = options.precision;
        }
    }
    // handle the various notations
    switch (notation) {
    case 'fixed':
        return exports.toFixed(value, precision);
    case 'exponential':
        return exports.toExponential(value, precision);
    case 'auto':
        // determine lower and upper bound for exponential notation.
        // TODO: implement support for upper and lower to be BigNumbers themselves
        var lower = 0.001;
        var upper = 100000;
        if (options && options.exponential) {
            if (options.exponential.lower !== undefined) {
                lower = options.exponential.lower;
            }
            if (options.exponential.upper !== undefined) {
                upper = options.exponential.upper;
            }
        }
        // adjust the configuration of the BigNumber constructor (yeah, this is quite tricky...)
        var oldConfig = {
            toExpNeg: value.constructor.toExpNeg,
            toExpPos: value.constructor.toExpPos
        };
        value.constructor.config({
            toExpNeg: Math.round(Math.log(lower) / Math.LN10),
            toExpPos: Math.round(Math.log(upper) / Math.LN10)
        });
        // handle special case zero
        if (value.isZero())
            return '0';
        // determine whether or not to output exponential notation
        var str;
        var abs = value.abs();
        if (abs.gte(lower) && abs.lt(upper)) {
            // normal number notation
            str = value.toSignificantDigits(precision).toFixed();
        } else {
            // exponential notation
            str = exports.toExponential(value, precision);
        }
        // remove trailing zeros after the decimal point
        return str.replace(/((\.\d*?)(0+))($|e)/, function () {
            var digits = arguments[2];
            var e = arguments[4];
            return digits !== '.' ? digits + e : e;
        });
    default:
        throw new Error('Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", or "fixed".');
    }
}})();