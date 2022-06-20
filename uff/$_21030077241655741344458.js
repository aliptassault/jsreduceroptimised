(function(){{
    var s = size || exports.size(array);
    // unsqueeze outer dimensions
    if (outer) {
        for (var i = 0; i < outer; i++) {
            array = [array];
            s.unshift(1);
        }
    }
    // unsqueeze inner dimensions
    array = _unsqueeze(array, dims, 0);
    while (s.length < dims) {
        s.push(1);
    }
    return array;
}})();