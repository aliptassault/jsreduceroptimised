(function(){{
    if (!(        $that instanceof RangeNode)) {
        throw new SyntaxError('Constructor must be called with the new operator');
    }
    // validate inputs
    if (!type.isNode(start))
        throw new TypeError('Node expected');
    if (!type.isNode(end))
        throw new TypeError('Node expected');
    if (step && !type.isNode(step))
        throw new TypeError('Node expected');
    if (arguments.length > 3)
        throw new Error('Too many arguments');
        $that.start = start;
    // included lower-bound
        $that.end = end;
    // included upper-bound
        $that.step = step || null;    // optional step
}})();