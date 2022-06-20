(function(){{
    var object =     $that.object.toHTML(options);
    var index =     $that.index ?     $that.index.toHTML(options) : '';
    var value =     $that.value.toHTML(options);
    if (needParenthesis(        $that, options && options.parenthesis)) {
        value = '<span class="math-paranthesis math-round-parenthesis">(</span>' + value + '<span class="math-paranthesis math-round-parenthesis">)</span>';
    }
    return object + index + '<span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + value;
}})();