(function(){{
    var actualType = getTypeOf(actual);
    var _expected = expected ? expected.split(',') : null;
    var _fn = fn || 'unnamed';
    var anyType = _expected && contains(_expected, 'any');
    var message;
    var data = {
        fn: fn,
        index: index,
        actual: actual,
        expected: _expected
    };
    if (_expected) {
        if (argCount > index && !anyType) {
            // unexpected type
            message = 'Unexpected type of argument in function ' + _fn + ' (expected: ' + _expected.join(' or ') + ', actual: ' + actualType + ', index: ' + index + ')';
        } else {
            // too few arguments
            message = 'Too few arguments in function ' + _fn + ' (expected: ' + _expected.join(' or ') + ', index: ' + index + ')';
        }
    } else {
        // too many arguments
        message = 'Too many arguments in function ' + _fn + ' (expected: ' + index + ', actual: ' + argCount + ')';
    }
    var err = new TypeError(message);
    err.data = data;
    return err;
}})();