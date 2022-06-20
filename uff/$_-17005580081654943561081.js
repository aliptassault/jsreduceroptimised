(function(){{
    var object =     $that.object.toTex(options);
    if (needParenthesis(        $that.object)) {
        object = '\\left(' + object + '\\right)';
    }
    return object +    $that.index.toTex(options);
}})();