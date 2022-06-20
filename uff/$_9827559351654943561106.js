(function(){{
    return    $that.blocks.map(function (param) {
        return param.node.toString(options) + (param.visible ? '' : ';');
    }).join('\n');
}})();