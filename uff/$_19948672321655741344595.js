(function(){{
    var m = matrix(value);
    var subset = m.subset(index);
    // returns a Matrix
    return index.isScalar() ? subset : subset.valueOf();    // return an Array (like the input)
}})();