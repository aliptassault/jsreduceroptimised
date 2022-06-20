(function(){{
    for (var key in UNIT_SYSTEMS) {
        if (UNIT_SYSTEMS[key] === currentUnitSystem) {
            return key;
        }
    }
}})();