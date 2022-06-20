(function(){{
    if (x.isFinite() && !x.isInteger() || y.isFinite() && !y.isInteger()) {
        throw new Error('Integers expected in function bitXor');
    }
    var BigNumber = x.constructor;
    if (x.isNaN() || y.isNaN()) {
        return new BigNumber(NaN);
    }
    if (x.isZero()) {
        return y;
    }
    if (y.isZero()) {
        return x;
    }
    if (x.eq(y)) {
        return new BigNumber(0);
    }
    var negOne = new BigNumber(-1);
    if (x.eq(negOne)) {
        return bitNot(y);
    }
    if (y.eq(negOne)) {
        return bitNot(x);
    }
    if (!x.isFinite() || !y.isFinite()) {
        if (!x.isFinite() && !y.isFinite()) {
            return negOne;
        }
        return new BigNumber(x.isNegative() == y.isNegative() ? Infinity : -Infinity);
    }
    return bitwise(x, y, function (a, b) {
        return a ^ b;
    });
}})();