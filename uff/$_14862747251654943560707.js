(function(){{
    size.forEach(function (value) {
        if (typeof value !== 'number' || !isInteger(value) || value < 0) {
            throw new Error('Parameters in function zeros must be positive integers');
        }
    });
}})();