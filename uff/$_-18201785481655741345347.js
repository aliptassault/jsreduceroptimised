(function(){{
    // acot(c) = i / 2 log((c - i) / (c + i))
    var a =     $that['re'];
    var b =     $that['im'];
    if (b === 0) {
        return new Complex(Math.atan2(1, a), 0);
    }
    var d = a * a + b * b;
    return d !== 0 ? new Complex(a / d, -b / d).atan() : new Complex(a !== 0 ? a / 0 : 0, b !== 0 ? -b / 0 : 0).atan();
}})();