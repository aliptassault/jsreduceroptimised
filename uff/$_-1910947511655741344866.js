(function(){{
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var parens = calculateNecessaryParentheses(    $that, parenthesis);
    var str =     $that.start.toTex(options);
    if (parens.start) {
        str = '\\left(' + str + '\\right)';
    }
    if (        $that.step) {
        var step =         $that.step.toTex(options);
        if (parens.step) {
            step = '\\left(' + step + '\\right)';
        }
        str += ':' + step;
    }
    var end =     $that.end.toTex(options);
    if (parens.end) {
        end = '\\left(' + end + '\\right)';
    }
    str += ':' + end;
    return str;
}})();