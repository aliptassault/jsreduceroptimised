(function(){{
    // checks if the number of arguments are correct in count and are valid (should be numbers)
    if (a.constructor !== Array) {
        a = _objectToArray(a);
    }
    return typeof a[0] === 'number' && typeof a[1] === 'number';
}})();