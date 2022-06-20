(function(){{
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var expr =     $that.expr.toString(options);
    if (needParenthesis(        $that, parenthesis)) {
        expr = '(' + expr + ')';
    }
    return    $that.name + '(' +    $that.params.join(', ') + ') = ' + expr;
}})();