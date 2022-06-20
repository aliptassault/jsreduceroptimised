(function(){{
    var nodes = [];
        $that.traverse(function (node, path, parent) {
        if (callback(node, path, parent)) {
            nodes.push(node);
        }
    });
    return nodes;
}})();