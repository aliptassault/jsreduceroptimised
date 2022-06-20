(function(){{
    var d;
    if (order === 1) {
        d = '{d\\over d' + x + '}';
    } else {
        d = '{d^{' + order + '}\\over d' + x + '^{' + order + '}}';
    }
    return d + '\\left[' + expr + '\\right]';
}})();