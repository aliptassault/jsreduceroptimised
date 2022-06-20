(function(){{
    // acos(c) = i * log(c - i * sqrt(1 - c^2))
    var a =     $that['re'];
    var b =     $that['im'];
    var t1 = new Complex(b * b - a * a + 1, -2 * a * b)['sqrt']();
    var t2 = new Complex(t1['re'] - b, t1['im'] + a)['log']();
    return new Complex(Math.PI / 2 - t2['im'], t2['re']);
}})();