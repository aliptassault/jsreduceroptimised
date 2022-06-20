(function(){{
    var args =     $that.args.map(function (arg) {
        return arg.toHTML(options);
    });
    // format the arguments like "add(2, 4.2)"
    return '<span class="math-function">' + escape(    $that.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + args.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>';
}})();