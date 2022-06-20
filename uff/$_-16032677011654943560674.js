(function(){{
    // result
    var c;
    // check storage format
    switch (y.storage()) {
    case 'sparse':
        c = algorithm12(y, x, equalScalar, true);
        break;
    default:
        c = algorithm14(y, x, equalScalar, true);
        break;
    }
    return c;
}})();