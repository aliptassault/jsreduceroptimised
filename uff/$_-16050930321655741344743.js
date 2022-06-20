(function(){{
    if (!(        $that instanceof IndexError)) {
        throw new SyntaxError('Constructor must be called with the new operator');
    }
        $that.index = index;
    if (arguments.length < 3) {
                $that.min = 0;
                $that.max = min;
    } else {
                $that.min = min;
                $that.max = max;
    }
    if (        $that.min !== undefined &&        $that.index <        $that.min) {
                $that.message = 'Index out of range (' +        $that.index + ' < ' +        $that.min + ')';
    } else if (        $that.max !== undefined &&        $that.index >=        $that.max) {
                $that.message = 'Index out of range (' +        $that.index + ' > ' + (        $that.max - 1) + ')';
    } else {
                $that.message = 'Index out of range (' +        $that.index + ')';
    }
        $that.stack = new Error().stack;
}})();