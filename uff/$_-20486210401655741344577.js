(function(){{
    if (x.value == null)
        throw new Error('Parameter x contains a unit with undefined value');
    if (y.value == null)
        throw new Error('Parameter y contains a unit with undefined value');
    if (!x.equalBase(y))
        throw new Error('Units do not match');
    var res = x.clone();
    res.value = add(res.value, y.value);
    res.fixPrefix = false;
    return res;
}})();