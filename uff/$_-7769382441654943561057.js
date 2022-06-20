(function(){{
    // check scalar is zero
    if (!equalScalar(x, 0)) {
        // result
        var c;
        // check storage format
        switch (y.storage()) {
        case 'sparse':
            c = algorithm12(y, x, round, true);
            break;
        default:
            c = algorithm14(y, x, round, true);
            break;
        }
        return c;
    }
    // do not execute algorithm, result will be a zero matrix
    return zeros(y.size(), y.storage());
}})();