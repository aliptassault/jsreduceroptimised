(function(){{
    if (!(        $that instanceof BlockNode)) {
        throw new SyntaxError('Constructor must be called with the new operator');
    }
    // validate input, copy blocks
    if (!Array.isArray(blocks))
        throw new Error('Array expected');
        $that.blocks = blocks.map(function (block) {
        var node = block && block.node;
        var visible = block && block.visible !== undefined ? block.visible : true;
        if (!type.isNode(node))
            throw new TypeError('Property "node" must be a Node');
        if (typeof visible !== 'boolean')
            throw new TypeError('Property "visible" must be a boolean');
        return {
            node: node,
            visible: visible
        };
    });
}})();