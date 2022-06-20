(function(){{
    if (!(        $that instanceof ObjectNode)) {
        throw new SyntaxError('Constructor must be called with the new operator');
    }
        $that.properties = properties || {};
    // validate input
    if (properties) {
        if (!(typeof properties === 'object') || !Object.keys(properties).every(function (key) {
                return type.isNode(properties[key]);
            })) {
            throw new TypeError('Object containing Nodes expected');
        }
    }
}})();