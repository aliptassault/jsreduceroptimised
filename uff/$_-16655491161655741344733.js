(function(){{
    // result
    var c;
    // process storage format
    switch (x.storage()) {
    case 'sparse':
        c = algorithm11(x, y, divideScalar, false);
        break;
    case 'dense':
        c = algorithm14(x, y, divideScalar, false);
        break;
    }
    return c;
}})();