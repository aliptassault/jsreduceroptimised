(function(){{
    var blocks = [];
    for (var i = 0; i <        $that.blocks.length; i++) {
        var block =         $that.blocks[i];
        var node =         $that._ifNode(callback(block.node, 'blocks[' + i + '].node',         $that));
        blocks[i] = {
            node: node,
            visible: block.visible
        };
    }
    return new BlockNode(blocks);
}})();