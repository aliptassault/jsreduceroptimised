(function(){{
    // This gives correct, but unexpected, results for units with an offset.
    // For example, abs(-283.15 degC) = -263.15 degC !!!
    var ret =     $that.clone();
    ret.value = abs(ret.value);
    for (var i in ret.units) {
        if (ret.units[i].unit.name === 'VA' || ret.units[i].unit.name === 'VAR') {
            ret.units[i].unit = UNITS['W'];
        }
    }
    return ret;
}})();