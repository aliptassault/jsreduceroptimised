(function(){{
    if (!x.equalBase(y)) {
        throw new Error('Cannot compare units with different base');
    }
    return equalScalar(x.value, y.value);
}})();