(function(){{
    // tan(c) = (e^(ci) - e^(-ci)) / (i(e^(ci) + e^(-ci)))
    var a = 2 *    $that['re'];
    var b = 2 *    $that['im'];
    var d = Math.cos(a) + cosh(b);
    return new Complex(Math.sin(a) / d, sinh(b) / d);
}})();