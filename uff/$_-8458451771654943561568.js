(function(){{
    for (var r = 1; e > 0; b = b * b % m, e >>= 1) {
        if (e & 1) {
            r = r * b % m;
        }
    }
    return r;
}})();