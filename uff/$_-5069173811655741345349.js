(function(){{
    // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))
    var a =     $that['re'];
    var b =     $that['im'];
    if (a === 0 && b === 0) {
        return new Complex(Math.PI / 2, Infinity);
    }
    var d = a * a + b * b;
    return d !== 0 ? new Complex(a / d, -b / d).asin() : new Complex(a !== 0 ? a / 0 : 0, b !== 0 ? -b / 0 : 0).asin();
}})();