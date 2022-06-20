(function(){{
    return new ConditionalNode(    $that._ifNode(callback(    $that.condition, 'condition',     $that)),     $that._ifNode(callback(    $that.trueExpr, 'trueExpr',     $that)),     $that._ifNode(callback(    $that.falseExpr, 'falseExpr',     $that)));
}})();