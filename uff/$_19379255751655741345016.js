(function(){{
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var expr =     $that.expr.toTex(options);
    if (needParenthesis(        $that, parenthesis)) {
        expr = '\\left(' + expr + '\\right)';
    }
    return '\\mathrm{' +    $that.name + '}\\left(' +    $that.params.map(latex.toSymbol).join(',') + '\\right):=' + expr;
}})();