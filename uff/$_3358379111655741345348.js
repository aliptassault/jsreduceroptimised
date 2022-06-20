(function(){{
    // asec(c) = -i * log(1 / c + sqrt(1 - i / c^2))
    var a =     $that['re'];
    var b =     $that['im'];
    if (a === 0 && b === 0) {
        return new Complex(0, Infinity);
    }
    var d = a * a + b * b;
    return d !== 0 ? new Complex(a / d, -b / d).acos() : new Complex(a !== 0 ? a / 0 : 0, b !== 0 ? -b / 0 : 0).acos();
}})();