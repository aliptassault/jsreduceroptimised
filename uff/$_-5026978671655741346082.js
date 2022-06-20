(function(){{
    // consider values close to zero (+/-)
    if (x == 0) {
        return Number.POSITIVE_INFINITY;
    } else {
        return Math.abs(2 / (Math.exp(x) - Math.exp(-x))) * sign(x);
    }
}})();