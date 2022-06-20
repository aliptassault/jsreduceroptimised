(function(){{
    // result
    var c;
    // check storage format
    switch (y.storage()) {
    case 'sparse':
        c = algorithm11(y, x, multiplyScalar, true);
        break;
    case 'dense':
        c = algorithm14(y, x, multiplyScalar, true);
        break;
    }
    return c;
}})();