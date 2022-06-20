(function(){{
    if (!options || options && !options.parenthesis || options && options.parenthesis === 'keep') {
        return '<span class="math-parenthesis math-round-parenthesis">(</span>' +        $that.content.toHTML(options) + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }
    return    $that.content.toHTML(options);
}})();