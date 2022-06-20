(function(){{
    if (!(node instanceof IndexNode)) {
        throw new TypeError('No valid IndexNode');
    }
    // args can be mutated by IndexNode, when dimensions use `end`
    var childArgs = Object.create(args);
    // helper function to create a Range from start, step and end
    defs.range = function (start, end, step) {
        return new Range(type.isBigNumber(start) ? start.toNumber() : start, type.isBigNumber(end) ? end.toNumber() : end, type.isBigNumber(step) ? step.toNumber() : step);
    };
    // TODO: implement support for bignumber (currently bignumbers are silently
    //       reduced to numbers when changing the value to zero-based)
    // TODO: Optimization: when the range values are ConstantNodes,
    //       we can beforehand resolve the zero-based value
    // optimization for a simple object property
    var dimensions = map(node.dimensions, function (range, i) {
        if (type.isRangeNode(range)) {
            if (range.needsEnd()) {
                childArgs.end = 'end';
                // resolve end and create range
                return '(function () {' + 'var end = size[' + i + ']; ' + 'return range(' + compile(range.start, defs, childArgs) + ', ' + compile(range.end, defs, childArgs) + ', ' + (range.step ? compile(range.step, defs, childArgs) : '1') + '); ' + '})()';
            } else {
                // create range
                return 'range(' + compile(range.start, defs, childArgs) + ', ' + compile(range.end, defs, childArgs) + ', ' + (range.step ? compile(range.step, defs, childArgs) : '1') + ')';
            }
        }
        if (type.isSymbolNode(range) && range.name === 'end') {
            childArgs.end = 'end';
            // resolve the parameter 'end'
            return '(function () {' + 'var end = size[' + i + ']; ' + 'return ' + compile(range, defs, childArgs) + '; ' + '})()';
        } else {
            // ConstantNode
            return compile(range, defs, childArgs);
        }
    });
    return 'math.index(' + join(dimensions, ', ') + ')';
}})();