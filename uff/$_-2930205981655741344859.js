(function(){{
    if (!(node instanceof RangeNode)) {
        throw new TypeError('No valid RangeNode');
    }
    return 'math.range(' + compile(node.start, defs, args) + ', ' + compile(node.end, defs, args) + (node.step ? ', ' + compile(node.step, defs, args) : '') + ')';
}})();