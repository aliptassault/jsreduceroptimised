(function(){{
    if (!(node instanceof BlockNode)) {
        throw new TypeError('No valid BlockNode');
    }
    defs.ResultSet = ResultSet;
    var blocks = map(node.blocks, function (param) {
        var js = compile(param.node, defs, args);
        if (param.visible) {
            return 'results.push(' + js + ');';
        } else {
            return js + ';';
        }
    });
    return '(function () {' + 'var results = [];' + join(blocks, '') + 'return new ResultSet(results);' + '})()';
}})();