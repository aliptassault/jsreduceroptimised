(function(){{
    if (unit.equalBase(BASE_UNITS.NONE) && unit.value !== null && !config.predictable) {
        return unit.value;
    } else {
        return unit;
    }
}})();