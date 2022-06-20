(function(){{
    var isParenthesisNode = arg.getIdentifier() === 'ParenthesisNode';
    if (result[index] || isParenthesisNode) {
        //put in parenthesis?
        return true;
    }
    return false;
}})();