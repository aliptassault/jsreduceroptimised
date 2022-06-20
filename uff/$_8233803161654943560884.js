(function(){{
    var size = Array.isArray(mat) ? arraySize(mat) : mat.size();
    if (dim < 0 || dim >= size.length) {
        // TODO: would be more clear when throwing a DimensionError here
        throw new IndexError(dim, size.length);
    }
    if (isMatrix(mat)) {
        return mat.create(_reduce(mat.valueOf(), dim, callback));
    } else {
        return _reduce(mat, dim, callback);
    }
}})();