(function(){{
    var res =     $that.clone();
    for (var i = 0; i < BASE_DIMENSIONS.length; i++) {
        // Dimensions arrays may be of different lengths. Default to 0.
        res.dimensions[i] = (        $that.dimensions[i] || 0) - (other.dimensions[i] || 0);
    }
    // Invert and append other's units list onto res (simplify later in Unit.prototype.format)
    for (var i = 0; i < other.units.length; i++) {
        // Make a deep copy
        var inverted = {};
        for (var key in other.units[i]) {
            inverted[key] = other.units[i][key];
        }
        inverted.power = -inverted.power;
        res.units.push(inverted);
    }
    // If at least one operand has a value, the result should have a value
    if (        $that.value != null || other.value != null) {
        var valThis =         $that.value == null ?         $that._normalize(1) :         $that.value;
        var valOther = other.value == null ? other._normalize(1) : other.value;
        res.value = divide(valThis, valOther);
    } else {
        res.value = null;
    }
    // Trigger simplification of the unit list at some future time
    res.isUnitListSimplified = false;
    return getNumericIfUnitless(res);
}})();