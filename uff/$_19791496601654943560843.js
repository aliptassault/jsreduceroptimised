(function(){{
    if (!x.isNegative() || config.predictable) {
        return x.sqrt();
    } else {
        // negative value -> downgrade to number to do complex value computation
        return _sqrtNumber(x.toNumber());
    }
}})();