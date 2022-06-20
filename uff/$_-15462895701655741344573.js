(function(){{
    var res = y.pow(-1);
    // TODO: move the divide function to Unit.js, it uses internals of Unit
    res.value = multiplyScalar(res.value === null ? res._normalize(1) : res.value, x);
    return res;
}})();