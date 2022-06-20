(function(){{
    var object =     $that.object.toHTML(options);
    if (needParenthesis(        $that.object)) {
        object = '<span class="math-parenthesis math-round-parenthesis">(</span>' + object + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }
    return object +    $that.index.toHTML(options);
}})();