(function(){{
    var items =     $that.items.map(function (node) {
        return node.toHTML(options);
    });
    return '<span class="math-parenthesis math-square-parenthesis">[</span>' + items.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>';
}})();