(function(){{
    // coth(c) = (e^c + e^-c) / (e^c - e^-c)
    var a = 2 *    $that['re'];
    var b = 2 *    $that['im'];
    var d = cosh(a) - Math.cos(b);
    return new Complex(sinh(a) / d, -Math.sin(b) / d);
}})();