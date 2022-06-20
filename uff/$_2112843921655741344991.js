(function(){{
    return    $that.blocks.map(function (param) {
        return param.node.toHTML(options) + (param.visible ? '' : '<span class="math-separator">;</span>');
    }).join('<span class="math-separator"><br /></span>');
}})();