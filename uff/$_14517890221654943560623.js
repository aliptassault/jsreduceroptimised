(function(){{
    // result
    var c;
    // check storage format
    switch (x.storage()) {
    case 'sparse':
        // algorithm 7 is faster than 9 since it calls f() for nonzero items only!
        c = algorithm10(x, unaryMinus(y), addScalar);
        break;
    default:
        c = algorithm14(x, y, subtract);
        break;
    }
    return c;
}})();