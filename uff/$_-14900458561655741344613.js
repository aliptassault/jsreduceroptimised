(function(){{
    var res = x.clone();
    res.value = res.value === null ? res._normalize(y) : multiplyScalar(res.value, y);
    return res;
}})();