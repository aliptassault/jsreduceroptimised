(function(){{
    // acsch(c) = log((1+sqrt(1+c^2))/c)
    var a =     $that['re'];
    var b =     $that['im'];
    if (b === 0) {
        return new Complex(a !== 0 ? Math.log(a + Math.sqrt(a * a + 1)) : Infinity, 0);
    }
    var d = a * a + b * b;
    return d !== 0 ? new Complex(a / d, -b / d).asinh() : new Complex(a !== 0 ? a / 0 : 0, b !== 0 ? -b / 0 : 0).asinh();
}})();