(function(){{
    if (y.isInteger() || x >= 0 || config.predictable) {
        return x.pow(y);
    } else {
        return new type.Complex(x.toNumber(), 0).pow(y.toNumber(), 0);
    }
}})();