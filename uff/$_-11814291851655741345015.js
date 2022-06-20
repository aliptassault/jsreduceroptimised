(function(){{
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var params = [];
    for (var i = 0; i <        $that.params.length; i++) {
        params.push('<span class="math-symbol math-parameter">' + escape(        $that.params[i]) + '</span>');
    }
    var expr =     $that.expr.toHTML(options);
    if (needParenthesis(        $that, parenthesis)) {
        expr = '<span class="math-parenthesis math-round-parenthesis">(</span>' + expr + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }
    return '<span class="math-function">' + escape(    $that.name) + '</span>' + '<span class="math-parenthesis math-round-parenthesis">(</span>' + params.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + expr;
}})();