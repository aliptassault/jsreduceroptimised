(function(){{
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var precedence = operators.getPrecedence(    $that, parenthesis);
    //Enclose Arguments in parentheses if they are an OperatorNode
    //or have lower or equal precedence
    //NOTE: enclosing all OperatorNodes in parentheses is a decision
    //purely based on aesthetics and readability
    var condition =     $that.condition.toHTML(options);
    var conditionPrecedence = operators.getPrecedence(    $that.condition, parenthesis);
    if (parenthesis === 'all' ||        $that.condition.type === 'OperatorNode' || conditionPrecedence !== null && conditionPrecedence <= precedence) {
        condition = '<span class="math-parenthesis math-round-parenthesis">(</span>' + condition + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }
    var trueExpr =     $that.trueExpr.toHTML(options);
    var truePrecedence = operators.getPrecedence(    $that.trueExpr, parenthesis);
    if (parenthesis === 'all' ||        $that.trueExpr.type === 'OperatorNode' || truePrecedence !== null && truePrecedence <= precedence) {
        trueExpr = '<span class="math-parenthesis math-round-parenthesis">(</span>' + trueExpr + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }
    var falseExpr =     $that.falseExpr.toHTML(options);
    var falsePrecedence = operators.getPrecedence(    $that.falseExpr, parenthesis);
    if (parenthesis === 'all' ||        $that.falseExpr.type === 'OperatorNode' || falsePrecedence !== null && falsePrecedence <= precedence) {
        falseExpr = '<span class="math-parenthesis math-round-parenthesis">(</span>' + falseExpr + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }
    return condition + '<span class="math-operator math-conditional-operator">?</span>' + trueExpr + '<span class="math-operator math-conditional-operator">:</span>' + falseExpr;
}})();