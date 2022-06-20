(function(){{
    if (!(        $that instanceof FunctionAssignmentNode)) {
        throw new SyntaxError('Constructor must be called with the new operator');
    }
    // validate input
    if (typeof name !== 'string')
        throw new TypeError('String expected for parameter "name"');
    if (!Array.isArray(params))
        throw new TypeError('Array containing strings or objects expected for parameter "params"');
    if (!type.isNode(expr))
        throw new TypeError('Node expected for parameter "expr"');
    if (name in keywords)
        throw new Error('Illegal function name, "' + name + '" is a reserved keyword');
        $that.name = name;
        $that.params = params.map(function (param) {
        return param && param.name || param;
    });
        $that.types = params.map(function (param) {
        return param && param.type || 'any';
    });
        $that.expr = expr;
}})();