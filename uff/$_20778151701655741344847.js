(function(){{
    var dimensions = [];
    for (var i = 0; i <        $that.dimensions.length; i++) {
        dimensions[i] =         $that._ifNode(callback(        $that.dimensions[i], 'dimensions[' + i + ']',         $that));
    }
    return new IndexNode(dimensions);
}})();