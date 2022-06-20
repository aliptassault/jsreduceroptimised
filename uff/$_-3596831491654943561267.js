(function(){{
    try {
        return new type.Complex(x);
    } catch (err) {
        throw new Error('Cannot convert "' + x + '" to Complex');
    }
}})();