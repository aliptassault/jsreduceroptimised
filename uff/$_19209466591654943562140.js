(function(){{
    if (x.isFinite() && !x.isInteger() || y.isFinite() && !y.isInteger()) {
        throw new Error('Integers expected in function bitOr');
    }
    var BigNumber = x.constructor;
    if (x.isNaN() || y.isNaN()) {
        return new BigNumber(NaN);
    }
    var negOne = new BigNumber(-1);
    if (x.isZero() || y.eq(negOne) || x.eq(y)) {
        return y;
    }
    if (y.isZero() || x.eq(negOne)) {
        return x;
    }
    if (!x.isFinite() || !y.isFinite()) {
        if (!x.isFinite() && !x.isNegative() && y.isNegative() || x.isNegative() && !y.isNegative() && !y.isFinite()) {
            return negOne;
        }
        if (x.isNegative() && y.isNegative()) {
            return x.isFinite() ? x : y;
        }
        return x.isFinite() ? y : x;
    }
    return bitwise(x, y, function (a, b) {
        return a | b;
    });
}})();