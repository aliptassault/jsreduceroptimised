(function(){{
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var parens = calculateNecessaryParentheses(    $that, parenthesis);
    //format string as start:step:stop
    var str;
    var start =     $that.start.toString(options);
    if (parens.start) {
        start = '(' + start + ')';
    }
    str = start;
    if (        $that.step) {
        var step =         $that.step.toString(options);
        if (parens.step) {
            step = '(' + step + ')';
        }
        str += ':' + step;
    }
    var end =     $that.end.toString(options);
    if (parens.end) {
        end = '(' + end + ')';
    }
    str += ':' + end;
    return str;
}})();