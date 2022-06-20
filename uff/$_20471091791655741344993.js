(function(){{
    if (!(        $that instanceof ConditionalNode)) {
        throw new SyntaxError('Constructor must be called with the new operator');
    }
    if (!type.isNode(condition))
        throw new TypeError('Parameter condition must be a Node');
    if (!type.isNode(trueExpr))
        throw new TypeError('Parameter trueExpr must be a Node');
    if (!type.isNode(falseExpr))
        throw new TypeError('Parameter falseExpr must be a Node');
        $that.condition = condition;
        $that.trueExpr = trueExpr;
        $that.falseExpr = falseExpr;
}})();