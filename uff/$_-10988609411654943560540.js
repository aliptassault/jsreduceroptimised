(function(){{
    var result = multiply(x, y);
    for (var i = 0; i < rest.length; i++) {
        result = multiply(result, rest[i]);
    }
    return result;
}})();