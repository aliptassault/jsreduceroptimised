(function(){{
    // asin(c) = -i * log(ci + sqrt(1 - c^2))
    var a =     $that['re'];
    var b =     $that['im'];
    var t1 = new Complex(b * b - a * a + 1, -2 * a * b)['sqrt']();
    var t2 = new Complex(t1['re'] - b, t1['im'] + a)['log']();
    return new Complex(t2['im'], -t2['re']);
}})();