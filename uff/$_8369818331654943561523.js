(function(){{
    // sinh(c) = (e^c - e^-c) / 2
    var a =     $that['re'];
    var b =     $that['im'];
    return new Complex(sinh(a) * Math.cos(b), cosh(a) * Math.sin(b));
}})();