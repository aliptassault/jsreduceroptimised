(function(){{
    return    $that.blocks.map(function (param) {
        return param.node.toTex(options) + (param.visible ? '' : ';');
    }).join('\\;\\;\n');
}})();