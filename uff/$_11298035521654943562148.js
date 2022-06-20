(function(){{
    if (x.isFinite() && !x.isInteger() || y.isFinite() && !y.isInteger()) {
        throw new Error('Integers expected in function rightArithShift');
    }
    var BigNumber = x.constructor;
    if (x.isNaN() || y.isNaN() || y.isNegative() && !y.isZero()) {
        return new BigNumber(NaN);
    }
    if (x.isZero() || y.isZero()) {
        return x;
    }
    if (!y.isFinite()) {
        if (x.isNegative()) {
            return new BigNumber(-1);
        }
        if (!x.isFinite()) {
            return new BigNumber(NaN);
        }
        return new BigNumber(0);
    }
    // Math.pow(2, y) is fully precise for y < 55, and fast
    if (y.lt(55)) {
        return x.div(Math.pow(2, y.toNumber()) + '').floor();
    }
    return x.div(new BigNumber(2).pow(y)).floor();
}})();