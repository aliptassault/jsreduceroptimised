(function(){{
    var s = size || exports.size(array);
    // squeeze outer dimensions
    while (Array.isArray(array) && array.length === 1) {
        array = array[0];
        s.shift();
    }
    // find the first dimension to be squeezed
    var dims = s.length;
    while (s[dims - 1] === 1) {
        dims--;
    }
    // squeeze inner dimensions
    if (dims < s.length) {
        array = _squeeze(array, dims, 0);
        s.length = dims;
    }
    return array;
}})();