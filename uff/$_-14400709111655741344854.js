(function(){{
    return    $that.dimensions.some(function (range) {
        return type.isRangeNode(range) && range.needsEnd() || type.isSymbolNode(range) && range.name === 'end';
    });
}})();