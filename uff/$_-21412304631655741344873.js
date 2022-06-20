(function(){{
    var items =     $that.items.map(function (node) {
        return node.toString(options);
    });
    return '[' + items.join(', ') + ']';
}})();