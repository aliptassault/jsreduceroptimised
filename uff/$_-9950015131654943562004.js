(function(){{
    var compileInlineExpression = load(__webpack_require__(81));
    var matrix = load(__webpack_require__(0));
    function mapTransform(args, math, scope) {
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
        return map(x, callback);
    }
    mapTransform.rawArgs = true;
    // one-based version of map function
    var map = typed('map', {
        'Array, function': function (x, callback) {
            return _map(x, callback, x);
        },
        'Matrix, function': function (x, callback) {
            return matrix(_map(x.valueOf(), callback, x));
        }
    });
    return mapTransform;
}})();