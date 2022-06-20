(function(){{
    var precedence = operators.getPrecedence(node, parenthesis);
    var exprPrecedence = operators.getPrecedence(node.expr, parenthesis);
    return parenthesis === 'all' || exprPrecedence !== null && exprPrecedence <= precedence;
}})();