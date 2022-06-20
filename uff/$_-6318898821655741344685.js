(function(){{
    var str = '';
    while (c != '' && c != '"') {
        if (c == '\\') {
            // escape character
            str += c;
            next();
        }
        str += c;
        next();
    }
    getToken();
    if (token != '"') {
        throw createSyntaxError('End of string " expected');
    }
    getToken();
    return str;
}})();