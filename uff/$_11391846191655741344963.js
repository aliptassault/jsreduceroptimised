(function(){{
    var object =     $that.object.toString(options);
    if (needParenthesis(        $that.object)) {
        object = '(' + object + ')';
    }
    return object +    $that.index.toString(options);
}})();