(function(){{
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var parens = calculateNecessaryParentheses(    $that, parenthesis);
    //format string as start:step:stop
    var str;
    var start =     $that.start.toHTML(options);
    if (parens.start) {
        start = '<span class="math-parenthesis math-round-parenthesis">(</span>' + start + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }
    str = start;
    if (        $that.step) {
        var step =         $that.step.toHTML(options);
        if (parens.step) {
            step = '<span class="math-parenthesis math-round-parenthesis">(</span>' + step + '<span class="math-parenthesis math-round-parenthesis">)</span>';
        }
        str += '<span class="math-operator math-range-operator">:</span>' + step;
    }
    var end =     $that.end.toHTML(options);
    if (parens.end) {
        end = '<span class="math-parenthesis math-round-parenthesis">(</span>' + end + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }
    str += '<span class="math-operator math-range-operator">:</span>' + end;
    return str;
}})();