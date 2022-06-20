(function(){{
    // cos(z) = (e^b + e^(-b)) / 2
    var a =     $that['re'];
    var b =     $that['im'];
    return new Complex(Math.cos(a) * cosh(b), -Math.sin(a) * sinh(b));
}})();