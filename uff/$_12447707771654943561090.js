(function(){{
    var object =     $that._ifNode(callback(    $that.object, 'object',     $that));
    var index =     $that.index ?     $that._ifNode(callback(    $that.index, 'index',     $that)) : null;
    var value =     $that._ifNode(callback(    $that.value, 'value',     $that));
    return new AssignmentNode(object, index, value);
}})();