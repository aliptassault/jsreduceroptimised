(function(){{
    // sin(c) = (e^b - e^(-b)) / (2i)
    var a =     $that['re'];
    var b =     $that['im'];
    return new Complex(Math.sin(a) * cosh(b), Math.cos(a) * sinh(b));
}})();