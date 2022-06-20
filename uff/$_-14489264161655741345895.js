(function(){{
    if (node.params.indexOf(varName) == -1) {
        return constNodes[node] = true;
    }
    return constTag(constNodes, node.expr, varName);
}})();