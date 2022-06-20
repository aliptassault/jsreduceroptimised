(function(){{
    // result
    var c;
    // check storage format
    switch (y.storage()) {
    case 'sparse':
        c = algorithm10(y, x, subtract, true);
        break;
    default:
        c = algorithm14(y, x, subtract, true);
        break;
    }
    return c;
}})();