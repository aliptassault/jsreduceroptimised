(function(){{
    if (x.isFinite() && !x.isInteger() || y.isFinite() && !y.isInteger()) {
        throw new Error('Integers expected in function bitAnd');
    }
    var BigNumber = x.constructor;
    if (x.isNaN() || y.isNaN()) {
        return new BigNumber(NaN);
    }
    if (x.isZero() || y.eq(-1) || x.eq(y)) {
        return x;
    }
    if (y.isZero() || x.eq(-1)) {
        return y;
    }
    if (!x.isFinite() || !y.isFinite()) {
        if (!x.isFinite() && !y.isFinite()) {
            if (x.isNegative() == y.isNegative()) {
                return x;
            }
            return new BigNumber(0);
        }
        if (!x.isFinite()) {
            if (y.isNegative()) {
                return x;
            }
            if (x.isNegative()) {
                return new BigNumber(0);
            }
            return y;
        }
        if (!y.isFinite()) {
            if (x.isNegative()) {
                return y;
            }
            if (y.isNegative()) {
                return new BigNumber(0);
            }
            return x;
        }
    }
    return bitwise(x, y, function (a, b) {
        return a & b;
    });
}})();