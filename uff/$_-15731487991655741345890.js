(function(){{
    return derivative(expr, parse(variable), options);
}    // TODO: replace the 8 signatures above with 4 as soon as typed-function supports optional arguments
     /* TODO: implement and test syntax with order of derivatives -> implement as an option {order: number}
    'Node, SymbolNode, ConstantNode': function (expr, variable, {order}) {
      var res = expr;
      for (var i = 0; i < order; i++) {
        var constNodes = {};
        constTag(constNodes, expr, variable.name);
        res = _derivative(res, constNodes);
      }
      return res;
    }
    */})();