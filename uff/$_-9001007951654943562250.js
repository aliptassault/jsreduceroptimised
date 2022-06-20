(function(){{
    // result
    var c;
    // check storage format
    switch (x.storage()) {
    case 'sparse':
        c = algorithm11(x, y, atan2, false);
        break;
    default:
        c = algorithm14(x, y, atan2, false);
        break;
    }
    return c;
}})();