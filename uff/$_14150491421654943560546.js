(function(){{
    // process storage
    switch (a.storage()) {
    case 'dense':
        return _multiplyDenseMatrixVector(a, b);
    case 'sparse':
        return _multiplySparseMatrixVector(a, b);
    }
}})();