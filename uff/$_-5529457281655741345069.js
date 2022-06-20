(function(){{
    if (!x.isNegative() || config.predictable) {
        return x.ln();
    } else {
        // downgrade to number, return Complex valued result
        return new type.Complex(x.toNumber(), 0).log();
    }
}})();