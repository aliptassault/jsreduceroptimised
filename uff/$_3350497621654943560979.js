(function(){{
    var BigNumber = x.constructor;
    var xBits, yBits;
    var xSign = +(x.s < 0);
    var ySign = +(y.s < 0);
    if (xSign) {
        xBits = decCoefficientToBinaryString(bitNot(x));
        for (var i = 0; i < xBits.length; ++i) {
            xBits[i] ^= 1;
        }
    } else {
        xBits = decCoefficientToBinaryString(x);
    }
    if (ySign) {
        yBits = decCoefficientToBinaryString(bitNot(y));
        for (var i = 0; i < yBits.length; ++i) {
            yBits[i] ^= 1;
        }
    } else {
        yBits = decCoefficientToBinaryString(y);
    }
    var minBits, maxBits, minSign;
    if (xBits.length <= yBits.length) {
        minBits = xBits;
        maxBits = yBits;
        minSign = xSign;
    } else {
        minBits = yBits;
        maxBits = xBits;
        minSign = ySign;
    }
    var shortLen = minBits.length;
    var longLen = maxBits.length;
    var expFuncVal = func(xSign, ySign) ^ 1;
    var outVal = new BigNumber(expFuncVal ^ 1);
    var twoPower = new BigNumber(1);
    var two = new BigNumber(2);
    var prevPrec = BigNumber.precision;
    BigNumber.config({ precision: 1000000000 });
    while (shortLen > 0) {
        if (func(minBits[--shortLen], maxBits[--longLen]) == expFuncVal) {
            outVal = outVal.plus(twoPower);
        }
        twoPower = twoPower.times(two);
    }
    while (longLen > 0) {
        if (func(minSign, maxBits[--longLen]) == expFuncVal) {
            outVal = outVal.plus(twoPower);
        }
        twoPower = twoPower.times(two);
    }
    BigNumber.config({ precision: prevPrec });
    if (expFuncVal == 0) {
        outVal.s = -outVal.s;
    }
    return outVal;
}})();