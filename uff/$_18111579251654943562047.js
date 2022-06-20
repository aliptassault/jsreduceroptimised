(function(){{
    if (n < 0) {
        return unaryMinusNode(new ConstantNode(n.negated().toString(), 'number'));
    }
    return new ConstantNode(n.toString(), 'number');
}})();