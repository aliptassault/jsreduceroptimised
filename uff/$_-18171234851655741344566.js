(function(){{
    // result
    var c;
    // check storage format
    switch (y.storage()) {
    case 'sparse':
        c = algorithm10(y, x, addScalar, true);
        break;
    default:
        c = algorithm14(y, x, addScalar, true);
        break;
    }
    return c;
}})();