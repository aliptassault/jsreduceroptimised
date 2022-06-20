(function(){{
    if (token == '') {
        // syntax error or unexpected end of expression
        throw createSyntaxError('Unexpected end of expression');
    } else if (token === '\'') {
        throw createSyntaxError('Value expected. Note: strings must be enclosed by double quotes');
    } else {
        throw createSyntaxError('Value expected');
    }
}})();