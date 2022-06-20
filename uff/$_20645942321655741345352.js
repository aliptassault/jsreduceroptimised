(function(){{
    // cosh(c) = (e^c + e^-c) / 2
    var a =     $that['re'];
    var b =     $that['im'];
    return new Complex(cosh(a) * Math.cos(b), sinh(a) * Math.sin(b));
}})();