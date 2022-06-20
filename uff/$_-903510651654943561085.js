(function(){{
    if (!(node instanceof AssignmentNode)) {
        throw new TypeError('No valid AssignmentNode');
    }
    defs.assign = assign;
    defs.access = access;
    defs.getSafeProperty = getSafeProperty;
    defs.setSafeProperty = setSafeProperty;
    var size;
    var object = compile(node.object, defs, args);
    var index = node.index ? compile(node.index, defs, args) : null;
    var value = compile(node.value, defs, args);
    var jsName = stringify(node.object.name);
    if (!node.index) {
        // apply a variable to the scope, for example `a=2`
        if (!type.isSymbolNode(node.object)) {
            throw new TypeError('SymbolNode expected as object');
        }
        return 'setSafeProperty(scope, ' + jsName + ', ' + value + ')';
    } else if (node.index.isObjectProperty()) {
        // apply an object property for example `a.b=2`
        var jsProp = stringify(node.index.getObjectProperty());
        return 'setSafeProperty(' + object + ', ' + jsProp + ', ' + value + ')';
    } else if (type.isSymbolNode(node.object)) {
        // update a matrix subset, for example `a[2]=3`
        size = node.index.needsSize() ? 'var size = math.size(object).valueOf();' : '';
        // apply updated object to scope
        return '(function () {' + '  var object = ' + object + ';' + '  var value = ' + value + ';' + '  ' + size + '  setSafeProperty(scope, ' + jsName + ', assign(object, ' + index + ', value));' + '  return value;' + '})()';
    } else {
        // type.isAccessorNode(node.object) === true
        // update a matrix subset, for example `a.b[2]=3`
        size = node.index.needsSize() ? 'var size = math.size(object).valueOf();' : '';
        // we will not use the compile function of the AccessorNode, but compile it
        // ourselves here as we need the parent object of the AccessorNode:
        // wee need to apply the updated object to parent object
        var parentObject = compile(node.object.object, defs, args);
        if (node.object.index.isObjectProperty()) {
            var jsParentProperty = stringify(node.object.index.getObjectProperty());
            return '(function () {' + '  var parent = ' + parentObject + ';' + '  var object = getSafeProperty(parent, ' + jsParentProperty + ');' + // parentIndex is a property
            '  var value = ' + value + ';' + size + '  setSafeProperty(parent, ' + jsParentProperty + ', assign(object, ' + index + ', value));' + '  return value;' + '})()';
        } else {
            // if some parameters use the 'end' parameter, we need to calculate the size
            var parentSize = node.object.index.needsSize() ? 'var size = math.size(parent).valueOf();' : '';
            var parentIndex = compile(node.object.index, defs, args);
            return '(function () {' + '  var parent = ' + parentObject + ';' + '  ' + parentSize + '  var parentIndex = ' + parentIndex + ';' + '  var object = access(parent, parentIndex);' + '  var value = ' + value + ';' + '  ' + size + '  assign(parent, parentIndex, assign(object, ' + index + ', value));' + '  return value;' + '})()';
        }
    }
}})();