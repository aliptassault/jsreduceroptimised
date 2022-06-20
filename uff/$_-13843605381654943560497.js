(function(){{
    // if epsilon is null or undefined, test whether x and y are exactly equal
    if (epsilon == null) {
        return x == y;
    }
    // use "==" operator, handles infinities
    if (x == y) {
        return true;
    }
    // NaN
    if (isNaN(x) || isNaN(y)) {
        return false;
    }
    // at this point x and y should be finite
    if (isFinite(x) && isFinite(y)) {
        // check numbers are very close, needed when comparing numbers near zero
        var diff = Math.abs(x - y);
        if (diff < exports.DBL_EPSILON) {
            return true;
        } else {
            // use relative error
            return diff <= Math.max(Math.abs(x), Math.abs(y)) * epsilon;
        }
    }
    // Infinite and Number or negative Infinite and positive Infinite cases
    return false;
}})();