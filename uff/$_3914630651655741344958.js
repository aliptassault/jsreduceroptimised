(function(){{
    if (!(        $that instanceof AccessorNode)) {
        throw new SyntaxError('Constructor must be called with the new operator');
    }
    if (!type.isNode(object)) {
        throw new TypeError('Node expected for parameter "object"');
    }
    if (!type.isIndexNode(index)) {
        throw new TypeError('IndexNode expected for parameter "index"');
    }
        $that.object = object || null;
        $that.index = index;
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