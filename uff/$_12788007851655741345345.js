(function(){{
    // atan(c) = i / 2 log((i + x) / (i - x))
    var a =     $that['re'];
    var b =     $that['im'];
    if (a === 0) {
        if (b === 1) {
            return new Complex(0, Infinity);
        }
        if (b === -1) {
            return new Complex(0, -Infinity);
        }
    }
    var d = a * a + (1 - b) * (1 - b);
    var t1 = new Complex((1 - b * b - a * a) / d, -2 * a / d).log();
    return new Complex(-0.5 * t1['im'], 0.5 * t1['re']);
}})();