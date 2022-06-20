(function(){{
    // csc(c) = 2i / (e^(ci) - e^(-ci))
    var a =     $that['re'];
    var b =     $that['im'];
    var d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 * a);
    return new Complex(Math.sin(a) * cosh(b) / d, -Math.cos(a) * sinh(b) / d);
}})();