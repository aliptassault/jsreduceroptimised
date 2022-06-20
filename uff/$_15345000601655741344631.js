(function(){{
    // strict equality for null and undefined?
    if (x === null) {
        return y === null;
    }
    if (y === null) {
        return x === null;
    }
    if (x === undefined) {
        return y === undefined;
    }
    if (y === undefined) {
        return x === undefined;
    }
    return equalScalar(x, y);
}})();