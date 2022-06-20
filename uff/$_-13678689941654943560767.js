(function(){{
    var newSize = matrix._size.slice(0),
        // copy the array
        changed = false;
    // add dimensions when needed
    while (newSize.length < size.length) {
        newSize.push(0);
        changed = true;
    }
    // enlarge size when needed
    for (var i = 0, ii = size.length; i < ii; i++) {
        if (size[i] > newSize[i]) {
            newSize[i] = size[i];
            changed = true;
        }
    }
    if (changed) {
        // resize only when size is changed
        _resize(matrix, newSize, defaultValue);
    }
}})();