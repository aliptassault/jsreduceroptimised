(function(){{
    var blocks =     $that.blocks.map(function (block) {
        return {
            node: block.node,
            visible: block.visible
        };
    });
    return new BlockNode(blocks);
}})();