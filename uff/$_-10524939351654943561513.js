(function(){{
    // sec(c) = 2 / (e^(ci) + e^(-ci))
    var a =     $that['re'];
    var b =     $that['im'];
    var d = 0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a);
    return new Complex(Math.cos(a) * cosh(b) / d, Math.sin(a) * sinh(b) / d);
}})();