(function(){{
    if (!(        $that instanceof AssignmentNode)) {
        throw new SyntaxError('Constructor must be called with the new operator');
    }
        $that.object = object;
        $that.index = value ? index : null;
        $that.value = value ? value : index;
    // validate input
    if (!type.isSymbolNode(object) && !type.isAccessorNode(object)) {
        throw new TypeError('SymbolNode or AccessorNode expected as "object"');
    }
    if (type.isSymbolNode(object) && object.name === 'end') {
        throw new Error('Cannot assign to symbol "end"');
    }
    if (        $that.index && !type.isIndexNode(        $that.index)) {
        // index is optional
        throw new TypeError('IndexNode expected as "index"');
    }
    if (!type.isNode(        $that.value)) {
        throw new TypeError('Node expected as "value"');
    }
    // readonly property name
    Object.defineProperty(    $that, 'name', {
        get: function () {
            if (this.index) {
                return this.index.isObjectProperty() ? this.index.getObjectProperty() : '';
            } else {
                return this.object.name || '';
            }
        }.bind(        $that),
        set: function () {
            throw new Error('Cannot assign a new name, name is read-only');
        }
    });
}})();