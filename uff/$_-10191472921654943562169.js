(function(){{
    var num = [
        (y0 - y) * c - (z0 - z) * b,
        (z0 - z) * a - (x0 - x) * c,
        (x0 - x) * b - (y0 - y) * a
    ];
    num = Math.pow(num[0] * num[0] + num[1] * num[1] + num[2] * num[2], 0.5);
    var den = Math.pow(a * a + b * b + c * c, 0.5);
    var result = num / den;
    return result;
}})();