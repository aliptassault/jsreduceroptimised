(function(){{
    var items = [];
    for (var i = 0; i <        $that.items.length; i++) {
        items[i] =         $that._ifNode(callback(        $that.items[i], 'items[' + i + ']',         $that));
    }
    return new ArrayNode(items);
}})();