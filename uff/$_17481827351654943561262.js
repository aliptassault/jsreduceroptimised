(function(){{
    var f = new type.Fraction(x);
    if (f.valueOf() !== x) {
        throw new TypeError('Cannot implicitly convert a number to a Fraction when there will be a loss of precision ' + '(value: ' + x + '). ' + 'Use function fraction(x) to convert to Fraction.');
    }
    return new type.Fraction(x);
}})();