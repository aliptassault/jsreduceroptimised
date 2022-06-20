(function(){{
    if (x.isFinite() && !x.isInteger()) {
        throw new Error('Integer expected in function bitNot');
    }
    var BigNumber = x.constructor;
    var prevPrec = BigNumber.precision;
    BigNumber.config({ precision: 1000000000 });
    var x = x.plus(new BigNumber(1));
    x.s = -x.s || null;
    BigNumber.config({ precision: prevPrec });
    return x;
}})();