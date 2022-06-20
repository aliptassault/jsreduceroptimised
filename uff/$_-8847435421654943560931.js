(function(){{
    if (!(        $that instanceof IndexNode)) {
        throw new SyntaxError('Constructor must be called with the new operator');
    }
        $that.dimensions = dimensions;
        $that.dotNotation = dotNotation || false;
    // validate input
    if (!isArray(dimensions) || !dimensions.every(type.isNode)) {
        throw new TypeError('Array containing Nodes expected for parameter "dimensions"');
    }
    if (        $that.dotNotation && !        $that.isObjectProperty()) {
        throw new Error('dotNotation only applicable for object properties');
    }
    // TODO: deprecated since v3, remove some day
    var deprecated = function () {
        throw new Error('Property `IndexNode.object` is deprecated, use `IndexNode.fn` instead');
    };
    Object.defineProperty(    $that, 'object', {
        get: deprecated,
        set: deprecated
    });
}})();