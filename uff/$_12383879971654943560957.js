(function(){{
    var precedence = operators.getPrecedence(node, parenthesis);
    var parens = {};
    var startPrecedence = operators.getPrecedence(node.start, parenthesis);
    parens.start = startPrecedence !== null && startPrecedence <= precedence || parenthesis === 'all';
    if (node.step) {
        var stepPrecedence = operators.getPrecedence(node.step, parenthesis);
        parens.step = stepPrecedence !== null && stepPrecedence <= precedence || parenthesis === 'all';
    }
    var endPrecedence = operators.getPrecedence(node.end, parenthesis);
    parens.end = endPrecedence !== null && endPrecedence <= precedence || parenthesis === 'all';
    return parens;
}})();