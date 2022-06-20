(function(){{
    // process storage
    switch (b.storage()) {
    case 'dense':
        return _multiplyVectorDenseMatrix(a, b);
    }
    throw new Error('Not implemented');
}})();