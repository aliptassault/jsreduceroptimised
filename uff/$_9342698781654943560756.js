(function(){{
    var last = dim === dims - 1, range = index.dimension(dim);
    if (last) {
        range.forEach(function (dataIndex, subIndex) {
            validateIndex(dataIndex);
            data[dataIndex] = submatrix[subIndex[0]];
        });
    } else {
        range.forEach(function (dataIndex, subIndex) {
            validateIndex(dataIndex);
            _setSubmatrix(data[dataIndex], index, submatrix[subIndex[0]], dims, dim + 1);
        });
    }
}})();