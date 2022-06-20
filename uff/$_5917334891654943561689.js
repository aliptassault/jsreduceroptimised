(function(){{
    if (typeof obj === 'undefined' || obj === null) {
        obj = {};
    }
    if (typeof name !== 'string') {
        throw new TypeError('createUnitSingle expects first parameter to be of type \'string\'');
    }
    // Check collisions with existing units
    if (UNITS.hasOwnProperty(name)) {
        throw new Error('Cannot create unit "' + name + '": a unit with that name already exists');
    }
    // TODO: Validate name for collisions with other built-in functions (like abs or cos, for example), and for acceptable variable names. For example, '42' is probably not a valid unit. Nor is '%', since it is also an operator.
    assertUnitNameIsValid(name);
    var defUnit = null;
    // The Unit from which the new unit will be created.
    var aliases = [];
    var offset = 0;
    var definition;
    var prefixes;
    if (obj && obj.type === 'Unit') {
        defUnit = obj.clone();
    } else if (typeof obj === 'string') {
        if (obj !== '') {
            definition = obj;
        }
    } else if (typeof obj === 'object') {
        definition = obj.definition;
        prefixes = obj.prefixes;
        offset = obj.offset;
        if (obj.aliases) {
            aliases = obj.aliases.valueOf();    // aliases could be a Matrix, so convert to Array
        }
    } else {
        throw new TypeError('Cannot create unit "' + name + '" from "' + obj.toString() + '": expecting "string" or "Unit" or "Object"');
    }
    if (aliases) {
        for (var i = 0; i < aliases.length; i++) {
            if (UNITS.hasOwnProperty(aliases[i])) {
                throw new Error('Cannot create alias "' + aliases[i] + '": a unit with that name already exists');
            }
        }
    }
    if (definition && typeof definition === 'string' && !defUnit) {
        try {
            defUnit = Unit.parse(definition, { allowNoUnits: true });
        } catch (ex) {
            ex.message = 'Could not create unit "' + name + '" from "' + definition + '": ' + ex.message;
            throw ex;
        }
    } else if (definition && definition.type === 'Unit') {
        defUnit = definition.clone();
    }
    aliases = aliases || [];
    offset = offset || 0;
    if (prefixes && prefixes.toUpperCase)
        prefixes = PREFIXES[prefixes.toUpperCase()] || PREFIXES.NONE;
    else
        prefixes = PREFIXES.NONE;
    // If defUnit is null, it is because the user did not
    // specify a defintion. So create a new base dimension.
    var newUnit = {};
    if (!defUnit) {
        // Add a new base dimension
        var baseName = name + '_STUFF';
        // foo --> foo_STUFF, or the essence of foo
        if (BASE_DIMENSIONS.indexOf(baseName) >= 0) {
            throw new Error('Cannot create new base unit "' + name + '": a base unit with that name already exists (and cannot be overridden)');
        }
        BASE_DIMENSIONS.push(baseName);
        // Push 0 onto existing base units
        for (var b in BASE_UNITS) {
            if (BASE_UNITS.hasOwnProperty(b)) {
                BASE_UNITS[b].dimensions[BASE_DIMENSIONS.length - 1] = 0;
            }
        }
        // Add the new base unit
        var newBaseUnit = { dimensions: [] };
        for (var i = 0; i < BASE_DIMENSIONS.length; i++) {
            newBaseUnit.dimensions[i] = 0;
        }
        newBaseUnit.dimensions[BASE_DIMENSIONS.length - 1] = 1;
        newBaseUnit.key = baseName;
        BASE_UNITS[baseName] = newBaseUnit;
        newUnit = {
            name: name,
            value: 1,
            dimensions: BASE_UNITS[baseName].dimensions.slice(0),
            prefixes: prefixes,
            offset: offset,
            base: baseName
        };
        currentUnitSystem[baseName] = {
            unit: newUnit,
            prefix: PREFIXES.NONE['']
        };
    } else {
        newUnit = {
            name: name,
            value: defUnit.value,
            dimensions: defUnit.dimensions.slice(0),
            prefixes: prefixes,
            offset: offset
        };
        // Create a new base if no matching base exists
        var anyMatch = false;
        for (var i in BASE_UNITS) {
            if (BASE_UNITS.hasOwnProperty(i)) {
                var match = true;
                for (var j = 0; j < BASE_DIMENSIONS.length; j++) {
                    if (Math.abs((newUnit.dimensions[j] || 0) - (BASE_UNITS[i].dimensions[j] || 0)) > 1e-12) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    anyMatch = true;
                    break;
                }
            }
        }
        if (!anyMatch) {
            var baseName = name + '_STUFF';
            // foo --> foo_STUFF, or the essence of foo
            // Add the new base unit
            var newBaseUnit = { dimensions: defUnit.dimensions.slice(0) };
            newBaseUnit.key = baseName;
            BASE_UNITS[baseName] = newBaseUnit;
            currentUnitSystem[baseName] = {
                unit: newUnit,
                prefix: PREFIXES.NONE['']
            };
            newUnit.base = baseName;
        }
    }
    Unit.UNITS[name] = newUnit;
    for (var i = 0; i < aliases.length; i++) {
        var aliasName = aliases[i];
        var alias = {};
        for (var key in newUnit) {
            if (newUnit.hasOwnProperty(key)) {
                alias[key] = newUnit[key];
            }
        }
        alias.name = aliasName;
        Unit.UNITS[aliasName] = alias;
    }
    return new Unit(null, name);
}})();