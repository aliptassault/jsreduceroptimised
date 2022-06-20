(function(){{
    // Alternatively could define a 'realmode' config option or something, but
    // 'predictable' will work for now
    if (config.predictable && !isInteger(y) && x < 0) {
        // Check to see if y can be represented as a fraction
        try {
            var yFrac = fraction(y);
            var yNum = number(yFrac);
            if (y === yNum || Math.abs((y - yNum) / y) < 1e-14) {
                if (yFrac.d % 2 === 1) {
                    return (yFrac.n % 2 === 0 ? 1 : -1) * Math.pow(-x, y);
                }
            }
        } catch (ex) {
        }    // Unable to express y as a fraction, so continue on
    }
    // x^Infinity === 0 if -1 < x < 1
    // A real number 0 is returned instead of complex(0)
    if (x * x < 1 && y === Infinity || x * x > 1 && y === -Infinity) {
        return 0;
    }
    // **for predictable mode** x^Infinity === NaN if x < -1
    // N.B. this behavour is different from `Math.pow` which gives
    // (-2)^Infinity === Infinity
    if (config.predictable && (x < -1 && y === Infinity || x > -1 && x < 0 && y === -Infinity)) {
        return NaN;
    }
    if (isInteger(y) || x >= 0 || config.predictable) {
        return Math.pow(x, y);
    } else {
        return new type.Complex(x, 0).pow(y, 0);
    }
}})();