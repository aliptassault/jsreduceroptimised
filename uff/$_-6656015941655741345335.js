(function(){{
    var a =     $that['re'];
    var b =     $that['im'];
    if (b === 0 && a > 0) {
    }
    return new Complex(logHypot(a, b), Math.atan2(b, a));
}})();