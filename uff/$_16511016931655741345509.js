(function(){{
    if (typeof obj !== 'object') {
        throw new TypeError('createUnit expects first parameter to be of type \'Object\'');
    }
    // Remove all units and aliases we are overriding
    if (options && options.override) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                Unit.deleteUnit(key);
            }
            if (obj[key].aliases) {
                for (var i = 0; i < obj[key].aliases.length; i++) {
                    Unit.deleteUnit(obj[key].aliases[i]);
                }
            }
        }
    }
    // TODO: traverse multiple times until all units have been added
    var lastUnit;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            lastUnit = Unit.createUnitSingle(key, obj[key]);
        }
    }
    return lastUnit;
}})();