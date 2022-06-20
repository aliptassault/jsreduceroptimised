(function(){{
    var g;
    var N =     $that['n'];
    var D =     $that['d'];
    if (isNaN(N) || isNaN(D)) {
        return 'NaN';
    }
    if (!Fraction['REDUCE']) {
        g = gcd(N, D);
        N /= g;
        D /= g;
    }
    var dec = 15;
    // 15 = decimal places when no repitation
    var cycLen = cycleLen(N, D);
    // Cycle length
    var cycOff = cycleStart(N, D, cycLen);
    // Cycle start
    var str =     $that['s'] === -1 ? '-' : '';
    str += N / D | 0;
    N %= D;
    N *= 10;
    if (N)
        str += '.';
    if (cycLen) {
        for (var i = cycOff; i--;) {
            str += N / D | 0;
            N %= D;
            N *= 10;
        }
        str += '(';
        for (var i = cycLen; i--;) {
            str += N / D | 0;
            N %= D;
            N *= 10;
        }
        str += ')';
    } else {
        for (var i = dec; N && i--;) {
            str += N / D | 0;
            N %= D;
            N *= 10;
        }
    }
    return str;
}})();