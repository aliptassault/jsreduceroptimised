(function(){{
    // result
    var c;
    // check storage format
    switch (x.storage()) {
    case 'sparse':
        c = algorithm10(x, y, addScalar, false);
        break;
    default:
        c = algorithm14(x, y, addScalar, false);
        break;
    }
    return c;
}})();