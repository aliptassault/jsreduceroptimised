(function(){{
    // find all `end` symbols in this RangeNode
    var endSymbols =     $that.filter(function (node) {
        return type.isSymbolNode(node) && node.name === 'end';
    });
    return endSymbols.length > 0;
}})();