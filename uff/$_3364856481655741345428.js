(function(){{
    // check it is a pattern matrix
    if (!        $that._values)
        throw new Error('Cannot invoke subset on a Pattern only matrix');
    // check arguments
    switch (arguments.length) {
    case 1:
        return _getsubset(        $that, index);
    // intentional fall through
    case 2:
    case 3:
        return _setsubset(        $that, index, replacement, defaultValue);
    default:
        throw new SyntaxError('Wrong number of arguments');
    }
}})();