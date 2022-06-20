(function(){{
    var a =     $that['re'];
    var b =     $that['im'];
    var ret = '';
    if (isNaN(a) || isNaN(b)) {
        return 'NaN';
    }
    if (a !== 0) {
        ret += a;
    }
    if (b !== 0) {
        if (a !== 0) {
            ret += b < 0 ? ' - ' : ' + ';
        } else if (b < 0) {
            ret += '-';
        }
        b = Math.abs(b);
        if (1 !== b) {
            ret += b;
        }
        ret += 'i';
    }
    if (!ret)
        return '0';
    return ret;
}})();