(function(){{
    if (!(node instanceof AccessorNode)) {
        throw new TypeError('No valid AccessorNode');
    }
    defs.access = access;
    defs.getSafeProperty = getSafeProperty;
    var object = compile(node.object, defs, args);
    var index = compile(node.index, defs, args);
    if (node.index.isObjectProperty()) {
        var jsProp = stringify(node.index.getObjectProperty());
        return 'getSafeProperty(' + object + ', ' + jsProp + ')';
    } else if (node.index.needsSize()) {
        // if some parameters use the 'end' parameter, we need to calculate the size
        return '(function () {' + '  var object = ' + object + ';' + '  var size = math.size(object).valueOf();' + '  return access(object, ' + index + ');' + '})()';
    } else {
        return 'access(' + object + ', ' + index + ')';
    }
}})();