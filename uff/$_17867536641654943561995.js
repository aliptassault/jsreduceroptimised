(function(){{
    return deepMap(expr, function (entry) {
        return parse(entry).compile().eval(scope);
    });
}})();