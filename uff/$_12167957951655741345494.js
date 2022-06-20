(function(){{
    var ret =     $that.clone();
    var proposedUnitList = [];
    // Multiple units or units with powers are formatted like this:
    // 5 (kg m^2) / (s^3 mol)
    // Build an representation from the base units of the SI unit system
    var missingBaseDim = false;
    for (var i = 0; i < BASE_DIMENSIONS.length; i++) {
        var baseDim = BASE_DIMENSIONS[i];
        if (Math.abs(ret.dimensions[i] || 0) > 1e-12) {
            if (UNIT_SYSTEMS['si'].hasOwnProperty(baseDim)) {
                proposedUnitList.push({
                    unit: UNIT_SYSTEMS['si'][baseDim].unit,
                    prefix: UNIT_SYSTEMS['si'][baseDim].prefix,
                    power: ret.dimensions[i] || 0
                });
            } else {
                throw new Error('Cannot express custom unit ' + baseDim + ' in SI units');
            }
        }
    }
    // Replace this unit list with the proposed list
    ret.units = proposedUnitList;
    ret.isUnitListSimplified = true;
    return ret;
}})();