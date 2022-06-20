(function(){{
    // result
    var c;
    // check storage format
    switch (x.storage()) {
    case 'sparse':
        c = algorithm11(x, y, round, false);
        break;
    default:
        c = algorithm14(x, y, round, false);
        break;
    }
    return c;
}})();