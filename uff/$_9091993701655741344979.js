(function(){{
    var object =     $that.object.toString(options);
    var index =     $that.index ?     $that.index.toString(options) : '';
    var value =     $that.value.toString(options);
    if (needParenthesis(        $that, options && options.parenthesis)) {
        value = '(' + value + ')';
    }
    return object + index + ' = ' + value;
}})();