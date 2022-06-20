(function(){{
    if (n < 0) {
        return unaryMinusNode(new ConstantNode(-n));
    }
    return new ConstantNode(n);
}})();