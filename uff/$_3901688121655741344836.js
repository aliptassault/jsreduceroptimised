(function(){{
    var num = Number(x);
    if (isNaN(num)) {
        throw new SyntaxError('String "' + x + '" is no valid number');
    }
    return num;
}})();