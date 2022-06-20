(function(){{
    parse(a, b);
    // mutates P
    a =     $that['re'];
    b =     $that['im'];
    var c = P['re'];
    var d = P['im'];
    var t, x;
    if (0 === d) {
        if (0 === c) {
            // Divisor is zero
            return new Complex(a !== 0 ? a / 0 : 0, b !== 0 ? b / 0 : 0);
        } else {
            // Divisor is real
            return new Complex(a / c, b / c);
        }
    }
    if (Math.abs(c) < Math.abs(d)) {
        x = c / d;
        t = c * x + d;
        return new Complex((a * x + b) / t, (b * x - a) / t);
    } else {
        x = d / c;
        t = d * x + c;
        return new Complex((a + b * x) / t, (b - a * x) / t);
    }
}})();