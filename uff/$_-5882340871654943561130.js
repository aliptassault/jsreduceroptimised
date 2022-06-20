(function(){{
    var expr =     $that._ifNode(callback(    $that.expr, 'expr',     $that));
    return new FunctionAssignmentNode(    $that.name,     $that.params.slice(0), expr);
}})();