(function(){{
    if (constNodes[node] !== undefined) {
        return new ConstantNode('0', config.number);
    }
    return _derivative(node.expr, constNodes);
}})();