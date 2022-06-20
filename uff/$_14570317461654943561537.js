(function(){{
    // acoth(c) = log((c+1) / (c-1)) / 2
    var a =     $that['re'];
    var b =     $that['im'];
    if (a === 0 && b === 0) {
        return new Complex(0, Math.PI / 2);
    }
    var d = a * a + b * b;
    return d !== 0 ? new Complex(a / d, -b / d).atanh() : new Complex(a !== 0 ? a / 0 : 0, b !== 0 ? -b / 0 : 0).atanh();
}})();