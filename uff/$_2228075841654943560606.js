(function(){{
    var res = x.clone();
    // TODO: move the divide function to Unit.js, it uses internals of Unit
    res.value = divideScalar(res.value === null ? res._normalize(1) : res.value, y);
    return res;
}})();