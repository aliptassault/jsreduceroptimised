(function(){{
    // result
    var c;
    // process storage format
    switch (x.storage()) {
    case 'sparse':
        c = algorithm11(x, y, multiplyScalar, false);
        break;
    case 'dense':
        c = algorithm14(x, y, multiplyScalar, false);
        break;
    }
    return c;
}})();