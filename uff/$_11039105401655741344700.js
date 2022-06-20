(function(){{
    var last = dim === dims - 1;
    var range = index.dimension(dim);
    if (last) {
        return range.map(function (i) {
            validateIndex(i, data.length);
            return data[i];
        }).valueOf();
    } else {
        return range.map(function (i) {
            validateIndex(i, data.length);
            var child = data[i];
            return _getSubmatrix(child, index, dims, dim + 1);
        }).valueOf();
    }
}})();