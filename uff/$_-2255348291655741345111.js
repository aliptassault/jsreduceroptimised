(function(){{
    try {
        return new type.BigNumber(x);
    } catch (err) {
        throw new Error('Cannot convert "' + x + '" to BigNumber');
    }
}})();