(function(){{
    // result
    var c;
    // process matrix storage
    switch (x.storage()) {
    case 'sparse':
        switch (y.storage()) {
        case 'sparse':
            // sparse .* sparse
            c = algorithm09(x, y, atan2, false);
            break;
        default:
            // sparse .* dense
            c = algorithm02(y, x, atan2, true);
            break;
        }
        break;
    default:
        switch (y.storage()) {
        case 'sparse':
            // dense .* sparse
            c = algorithm03(x, y, atan2, false);
            break;
        default:
            // dense .* dense
            c = algorithm13(x, y, atan2);
            break;
        }
        break;
    }
    return c;
}})();