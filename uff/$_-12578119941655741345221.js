(function(){{
    if (!x.isFinite())
        return nonFiniteToString(x);
    var k, e = x.e, str = digitsToString(x.d), len = str.length;
    if (isExp) {
        if (sd && (k = sd - len) > 0) {
            str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k);
        } else if (len > 1) {
            str = str.charAt(0) + '.' + str.slice(1);
        }
        str = str + (x.e < 0 ? 'e' : 'e+') + x.e;
    } else if (e < 0) {
        str = '0.' + getZeroString(-e - 1) + str;
        if (sd && (k = sd - len) > 0)
            str += getZeroString(k);
    } else if (e >= len) {
        str += getZeroString(e + 1 - len);
        if (sd && (k = sd - e - 1) > 0)
            str = str + '.' + getZeroString(k);
    } else {
        if ((k = e + 1) < len)
            str = str.slice(0, k) + '.' + str.slice(k);
        if (sd && (k = sd - len) > 0) {
            if (e + 1 === len)
                str += '.';
            str += getZeroString(k);
        }
    }
    return str;
}})();