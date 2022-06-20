(function(){{
    var a =     $that['re'];
    var b =     $that['im'];
    var d = a * a + b * b;
    return new Complex(a !== 0 ? a / d : 0, b !== 0 ? -b / d : 0);
}})();