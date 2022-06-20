(function(){{
    switch (arguments.length) {
    case 1:
        return _get(        $that, index);
    // intentional fall through
    case 2:
    case 3:
        return _set(        $that, index, replacement, defaultValue);
    default:
        throw new SyntaxError('Wrong number of arguments');
    }
}})();