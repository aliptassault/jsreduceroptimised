(function(){{
    var c = col();
    var error = new SyntaxError(message + ' (char ' + c + ')');
    error['char'] = c;
    return error;
}})();