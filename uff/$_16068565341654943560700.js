(function(){{
    // deep map collection, skip zeros since unaryMinus(0) = 0
    return deepMap(x, unaryMinus, true);
}    // TODO: add support for string
})();