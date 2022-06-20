(function(){{
    // result
    var c;
    // check storage format
    switch (x.storage()) {
    case 'sparse':
        c = algorithm12(x, y, equalScalar, false);
        break;
    default:
        c = algorithm14(x, y, equalScalar, false);
        break;
    }
    return c;
}})();