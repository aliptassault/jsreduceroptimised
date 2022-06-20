(function(){{
    try {
        return new type.Fraction(x);
    } catch (err) {
        throw new Error('Cannot convert "' + x + '" to Fraction');
    }
}})();