(function(){{
    var args =     $that.args.map(function (arg) {
        return arg.toString(options);
    });
    var fn = type.isFunctionAssignmentNode(    $that.fn) ? '(' +    $that.fn.toString(options) + ')' :     $that.fn.toString(options);
    // format the arguments like "add(2, 4.2)"
    return fn + '(' + args.join(', ') + ')';
}})();