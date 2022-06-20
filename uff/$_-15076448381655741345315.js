(function(){{
    // try case insensitive
    var lcase = x.toLowerCase();
    if (lcase === 'true') {
        return true;
    } else if (lcase === 'false') {
        return false;
    }
    // test whether value is a valid number
    var num = Number(x);
    if (x != '' && !isNaN(num)) {
        return !!num;
    }
    throw new Error('Cannot convert "' + x + '" to a boolean');
}})();