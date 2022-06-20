(function(){{
    if (!(        $that instanceof ArgumentsError)) {
        throw new SyntaxError('Constructor must be called with the new operator');
    }
        $that.fn = fn;
        $that.count = count;
        $that.min = min;
        $that.max = max;
        $that.message = 'Wrong number of arguments in function ' + fn + ' (' + count + ' provided, ' + min + (max != undefined ? '-' + max : '') + ' expected)';
        $that.stack = new Error().stack;
}})();