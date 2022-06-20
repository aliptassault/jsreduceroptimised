(function(){{
    var result = add(x, y);
    for (var i = 0; i < rest.length; i++) {
        result = add(result, rest[i]);
    }
    return result;
}})();