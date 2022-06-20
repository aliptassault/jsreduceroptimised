(function(){{
    // sech(c) = 2 / (e^c + e^-c)
    var a =     $that['re'];
    var b =     $that['im'];
    var d = Math.cos(2 * b) + cosh(2 * a);
    return new Complex(2 * cosh(a) * Math.cos(b) / d, -2 * sinh(a) * Math.sin(b) / d);
}})();