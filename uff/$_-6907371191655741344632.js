(function(){{
    // result
    var c;
    // process matrix storage
    switch (x.storage()) {
    case 'sparse':
        switch (y.storage()) {
        case 'sparse':
            // sparse + sparse
            c = algorithm07(x, y, equalScalar);
            break;
        default:
            // sparse + dense
            c = algorithm03(y, x, equalScalar, true);
            break;
        }
        break;
    default:
        switch (y.storage()) {
        case 'sparse':
            // dense + sparse
            c = algorithm03(x, y, equalScalar, false);
            break;
        default:
            // dense + dense
            c = algorithm13(x, y, equalScalar);
            break;
        }
        break;
    }
    return c;
}})();