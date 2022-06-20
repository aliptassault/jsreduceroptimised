(function(){{
    var object =     $that.object.toTex(options);
    var index =     $that.index ?     $that.index.toTex(options) : '';
    var value =     $that.value.toTex(options);
    if (needParenthesis(        $that, options && options.parenthesis)) {
        value = '\\left(' + value + '\\right)';
    }
    return object + index + ':=' + value;
}})();