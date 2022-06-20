(function(){{
    var compileInlineExpression = load(__webpack_require__(81));
    var matrix = load(__webpack_require__(0));
    function filterTransform(args, math, scope) {
        var x, callback;
        if (args[0]) {
            x = args[0].compile().eval(scope);
        }
        if (args[1]) {
            if (type.isSymbolNode(args[1]) || type.isFunctionAssignmentNode(args[1])) {
                // a function pointer, like filter([3, -2, 5], myTestFunction);
                callback = args[1].compile().eval(scope);
            } else {
                // an expression like filter([3, -2, 5], x > 0)
                callback = compileInlineExpression(args[1], math, scope);
            }
        }
        return filter(x, callback);
    }
    filterTransform.rawArgs = true;
    // one based version of function filter
    var filter = typed('filter', {
        'Array, function': _filter,
        'Matrix, function': function (x, test) {
            return matrix(_filter(x.toArray(), test));
        },
        'Array, RegExp': filterRegExp,
        'Matrix, RegExp': function (x, test) {
            return matrix(filterRegExp(x.toArray(), test));
        }
    });
    filter.toTex = undefined;
    // use default template
    return filterTransform;
}})();