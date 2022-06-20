(function(){{
    if (x === 0) {
        return x;
    }
    var negate = x < 0;
    var result;
    if (negate) {
        x = -x;
    }
    if (isFinite(x)) {
        result = Math.exp(Math.log(x) / 3);
        // from http://en.wikipedia.org/wiki/Cube_root#Numerical_methods
        result = (x / (result * result) + 2 * result) / 3;
    } else {
        result = x;
    }
    return negate ? -result : result;
}})();