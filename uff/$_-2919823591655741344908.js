(function(){{
    if (!(        $that instanceof Range)) {
        throw new SyntaxError('Constructor must be called with the new operator');
    }
    if (start != null) {
        if (type.isBigNumber(start))
            start = start.toNumber();
        else if (typeof start !== 'number')
            throw new TypeError('Parameter start must be a number');
    }
    if (end != null) {
        if (type.isBigNumber(end))
            end = end.toNumber();
        else if (typeof end !== 'number')
            throw new TypeError('Parameter end must be a number');
    }
    if (step != null) {
        if (type.isBigNumber(step))
            step = step.toNumber();
        else if (typeof step !== 'number')
            throw new TypeError('Parameter step must be a number');
    }
        $that.start = start != null ? parseFloat(start) : 0;
        $that.end = end != null ? parseFloat(end) : 0;
        $that.step = step != null ? parseFloat(step) : 1;
}})();