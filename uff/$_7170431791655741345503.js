(function(){{
    if (UNIT_SYSTEMS.hasOwnProperty(name)) {
        currentUnitSystem = UNIT_SYSTEMS[name];
    } else {
        throw new Error('Unit system ' + name + ' does not exist. Choices are: ' + Object.keys(UNIT_SYSTEMS).join(', '));
    }
}})();