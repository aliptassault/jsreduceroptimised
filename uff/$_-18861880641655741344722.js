(function(){{
    if (y.d !== 1) {
        if (config.predictable) {
            throw new Error('Function pow does not support non-integer exponents for fractions.');
        } else {
            return _pow(x.valueOf(), y.valueOf());
        }
    } else {
        return x.pow(y);
    }
}})();