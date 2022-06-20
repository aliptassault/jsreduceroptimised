(function(){{
    // matrix sizes
    var xsize = x.size();
    var ysize = y.size();
    // check dimensions
    if (xsize.length !== ysize.length)
        throw new DimensionError(xsize.length, ysize.length);
    // result
    var c;
    // process matrix storage
    switch (x.storage()) {
    case 'sparse':
        switch (y.storage()) {
        case 'sparse':
            // sparse - sparse
            c = algorithm05(x, y, subtract);
            break;
        default:
            // sparse - dense
            c = algorithm03(y, x, subtract, true);
            break;
        }
        break;
    default:
        switch (y.storage()) {
        case 'sparse':
            // dense - sparse
            c = algorithm01(x, y, subtract, false);
            break;
        default:
            // dense - dense
            c = algorithm13(x, y, subtract);
            break;
        }
        break;
    }
    return c;
}})();