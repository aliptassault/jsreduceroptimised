(function(){{
    var whole, str = '';
    var n =     $that['n'];
    var d =     $that['d'];
    if (        $that['s'] < 0) {
        str += '-';
    }
    if (d === 1) {
        str += n;
    } else {
        if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
            str += whole;
            n %= d;
        }
        str += '\\frac{';
        str += n;
        str += '}{';
        str += d;
        str += '}';
    }
    return str;
}})();