(function(){{
    if (!isInteger(a) || !isInteger(b)) {
        throw new Error('Parameters in function gcd must be integer numbers');
    }
    // http://en.wikipedia.org/wiki/Euclidean_algorithm
    var r;
    while (b != 0) {
        r = a % b;
        a = b;
        b = r;
    }
    return a < 0 ? -a : a;
}})();