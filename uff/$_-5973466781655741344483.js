(function(){{
    isUnit = typeof isUnit === 'undefined' ? false : isUnit;
    if (isUnit) {
        if (units.hasOwnProperty(name)) {
            return units[name];
        }
        return '\\mathrm{' + name + '}';
    }
    if (exports.symbols.hasOwnProperty(name)) {
        return exports.symbols[name];
    } else if (name.indexOf('_') !== -1) {
        //symbol with index (eg. alpha_1)
        var index = name.indexOf('_');
        return exports.toSymbol(name.substring(0, index)) + '_{' + exports.toSymbol(name.substring(index + 1)) + '}';
    }
    return name;
}})();