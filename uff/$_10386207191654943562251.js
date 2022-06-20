(function(){{
    // result
    var c;
    // check storage format
    switch (y.storage()) {
    case 'sparse':
        c = algorithm12(y, x, atan2, true);
        break;
    default:
        c = algorithm14(y, x, atan2, true);
        break;
    }
    return c;
}})();