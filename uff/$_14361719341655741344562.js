(function(){{
    // result
    var c;
    // process matrix storage
    switch (x.storage()) {
    case 'sparse':
        switch (y.storage()) {
        case 'sparse':
            // sparse + sparse
            c = algorithm04(x, y, addScalar);
            break;
        default:
            // sparse + dense
            c = algorithm01(y, x, addScalar, true);
            break;
        }
        break;
    default:
        switch (y.storage()) {
        case 'sparse':
            // dense + sparse
            c = algorithm01(x, y, addScalar, false);
            break;
        default:
            // dense + dense
            c = algorithm13(x, y, addScalar);
            break;
        }
        break;
    }
    return c;
}})();