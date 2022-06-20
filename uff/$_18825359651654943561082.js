(function(){{
    // TODO: maybe make a method on the nodes which tells whether they need parenthesis?
    return !(type.isAccessorNode(node) || type.isArrayNode(node) || type.isConstantNode(node) || type.isFunctionNode(node) || type.isObjectNode(node) || type.isParenthesisNode(node) || type.isSymbolNode(node));
}})();